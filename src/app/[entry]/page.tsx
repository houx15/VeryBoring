'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { QuestionFlow } from '@/components/QuestionFlow';
import { SnippetResult as SnippetResultCard } from '@/components/SnippetResult';
import { LoadingDots } from '@/components/ui/LoadingDots';
import { Button } from '@/components/ui/Button';
import { PageContainer } from '@/components/layout/PageContainer';
import { getQuestions, entryLabels } from '@/features';
import { getSettings } from '@/lib/storage/settings';
import { addHistory } from '@/lib/storage/history';
import type { EntryType } from '@/lib/types';

const VALID_ENTRIES: EntryType[] = ['eat', 'move', 'do', 'go'];

type PageState = 'questions' | 'loading' | 'result' | 'error';

export default function EntryPage() {
  const params = useParams();
  const router = useRouter();
  const entryParam = params.entry as string;

  const [pageState, setPageState] = useState<PageState>('questions');
  const [errorMessage, setErrorMessage] = useState('');
  const [snippetText, setSnippetText] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isExplaining, setIsExplaining] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);

  const entryType = VALID_ENTRIES.includes(entryParam as EntryType)
    ? (entryParam as EntryType)
    : null;

  const questions = entryType ? getQuestions(entryType) : [];
  const entryInfo = entryType ? entryLabels[entryType] : null;

  useEffect(() => {
    if (!entryType) {
      router.push('/');
    }
  }, [entryType, router]);

  const callGenerate = useCallback(
    async (userAnswers: Record<string, string>) => {
      const settings = getSettings();
      if (!settings || !settings.apiKey) {
        setPageState('error');
        setErrorMessage('还没有配置 API 密钥，先去设置一下吧');
        return;
      }

      setPageState('loading');

      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            entryType,
            answers: userAnswers,
            provider: settings.provider,
            apiKey: settings.apiKey,
            preferences: settings.preferences,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setPageState('error');
          setErrorMessage(data.error || '出了点意外，请稍后再试');
          return;
        }

        setSnippetText(data.snippet);
        setExplanation(null);
        setPageState('result');
      } catch {
        setPageState('error');
        setErrorMessage('网络出了点问题，请检查一下连接');
      }
    },
    [entryType],
  );

  const handleComplete = useCallback(
    (userAnswers: Record<string, string>) => {
      setAnswers(userAnswers);
      callGenerate(userAnswers);
    },
    [callGenerate],
  );

  const handleAccept = useCallback(() => {
    if (!entryType || !snippetText) return;

    addHistory({
      id: crypto.randomUUID(),
      entryType,
      answers,
      snippet: {
        actionPath: snippetText,
        timeEstimate: '',
        sceneDescription: '',
        rawResponse: snippetText,
      },
      accepted: true,
      timestamp: Date.now(),
    });
    setAccepted(true);
  }, [entryType, snippetText, answers]);

  const handleRegenerate = useCallback(() => {
    setIsRegenerating(true);
    callGenerate(answers).finally(() => setIsRegenerating(false));
  }, [answers, callGenerate]);

  const handleExplain = useCallback(async () => {
    const settings = getSettings();
    if (!settings || !settings.apiKey || !entryType) return;

    setIsExplaining(true);
    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entryType,
          answers,
          snippet: snippetText,
          provider: settings.provider,
          apiKey: settings.apiKey,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setExplanation(data.explanation);
      }
    } catch {
      // Silently fail — explanation is optional
    } finally {
      setIsExplaining(false);
    }
  }, [entryType, answers, snippetText]);

  if (!entryType || !entryInfo) {
    return null;
  }

  return (
    <div className="flex-1 flex flex-col py-24 md:py-32">
      <PageContainer>
        <Link
          href="/"
          className="inline-flex items-center text-sm text-neutral-500 hover:text-neutral-700 transition-colors duration-fast mb-24"
        >
          ← 返回
        </Link>
      </PageContainer>

      {pageState === 'questions' && (
        <QuestionFlow questions={questions} onComplete={handleComplete} />
      )}

      {pageState === 'loading' && (
        <div className="flex-1 flex items-center justify-center">
          <LoadingDots text="想一个不错的..." />
        </div>
      )}

      {pageState === 'error' && (
        <PageContainer>
          <div className="text-center py-64">
            <p className="text-neutral-600 mb-24">{errorMessage}</p>
            {errorMessage.includes('API 密钥') ? (
              <Link href="/settings">
                <Button variant="primary">去设置</Button>
              </Link>
            ) : (
              <Button variant="primary" onClick={() => setPageState('questions')}>
                再试一次
              </Button>
            )}
          </div>
        </PageContainer>
      )}

      {pageState === 'result' && snippetText && (
        <PageContainer>
          {accepted ? (
            <div className="text-center py-64 animate-fade-in-up">
              <p className="font-serif text-2xl text-neutral-600 mb-16">很好，就这样吧 ✓</p>
              <p className="text-sm text-neutral-400">已保存到历史记录</p>
              <div className="mt-32">
                <Link href="/">
                  <Button variant="secondary">回到首页</Button>
                </Link>
              </div>
            </div>
          ) : (
            <SnippetResultCard
              snippetText={snippetText}
              onAccept={handleAccept}
              onRegenerate={handleRegenerate}
              onExplain={handleExplain}
              isRegenerating={isRegenerating}
              isExplaining={isExplaining}
              explanation={explanation}
            />
          )}
        </PageContainer>
      )}
    </div>
  );
}
