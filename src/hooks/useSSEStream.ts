'use client';

import { useCallback, useRef, useState } from 'react';

interface SSEState {
  text: string;
  isStreaming: boolean;
  error: string | null;
}

export function useSSEStream() {
  const [state, setState] = useState<SSEState>({
    text: '',
    isStreaming: false,
    error: null,
  });
  const abortRef = useRef<AbortController | null>(null);

  const startStream = useCallback(async (url: string, body: object) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setState({ text: '', isStreaming: true, error: null });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: '请求失败' }));
        setState({
          text: '',
          isStreaming: false,
          error: (errorData as { error: string }).error,
        });
        return null;
      }

      const reader = response.body?.getReader();
      if (!reader) {
        setState({ text: '', isStreaming: false, error: '无法读取响应' });
        return null;
      }

      const decoder = new TextDecoder();
      let buffer = '';
      let accumulated = '';
      let result: string | null = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data: ')) continue;

          const jsonStr = trimmed.slice(6);
          let event: {
            type: string;
            content?: string;
            raw?: string;
            message?: string;
          };
          try {
            event = JSON.parse(jsonStr);
          } catch {
            continue;
          }

          if (event.type === 'text' || event.type === 'chunk') {
            if (event.content) {
              accumulated += event.content;
              setState((prev) => ({
                ...prev,
                text: prev.text + event.content,
              }));
            }
          } else if (event.type === 'done') {
            result = event.raw ?? accumulated;
            setState((prev) => ({ ...prev, isStreaming: false }));
          } else if (event.type === 'error') {
            setState({
              text: '',
              isStreaming: false,
              error: event.message ?? '未知错误',
            });
            return null;
          }
        }
      }

      return result;
    } catch (err) {
      if ((err as Error).name === 'AbortError') return null;
      setState({ text: '', isStreaming: false, error: '连接中断' });
      return null;
    }
  }, []);

  const abort = useCallback(() => {
    abortRef.current?.abort();
    setState((prev) => ({ ...prev, isStreaming: false }));
  }, []);

  return { ...state, startStream, abort };
}
