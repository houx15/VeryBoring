'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface SnippetResultProps {
  snippetText: string;
  onAccept: () => void;
  onRegenerate: () => void;
  onExplain: () => void;
  isRegenerating?: boolean;
  isExplaining?: boolean;
  explanation?: string | null;
}

export function SnippetResult({
  snippetText,
  onAccept,
  onRegenerate,
  onExplain,
  isRegenerating = false,
  isExplaining = false,
  explanation = null,
}: SnippetResultProps) {
  return (
    <div className="w-full">
      <div className="text-center mb-32">
        <h2 className="font-serif text-[24px] md:text-[28px] text-neutral-500 leading-relaxed">
          今天就这样吧 😌
        </h2>
      </div>

      <div className="mb-32 animate-fade-in-up">
        <Card className="bg-white border border-neutral-200">
          <p className="text-[18px] md:text-[20px] leading-[1.6] text-foreground font-medium">
            {snippetText}
          </p>
        </Card>
      </div>

      <div className="flex flex-col gap-12 mb-24">
        <Button
          variant="primary"
          size="default"
          onClick={onAccept}
          className="w-full"
        >
          👍 就这个
        </Button>

        <Button
          variant="secondary"
          size="default"
          onClick={onRegenerate}
          loading={isRegenerating}
          disabled={isRegenerating}
          className="w-full"
        >
          🔁 换一个
        </Button>

        <Button
          variant="ghost"
          size="default"
          onClick={onExplain}
          loading={isExplaining}
          disabled={isExplaining}
          className="w-full"
        >
          🤔 为什么
        </Button>
      </div>

      {explanation && (
        <div className="animate-fade-in">
          <Card className="bg-neutral-50 border border-neutral-200">
            <p className="text-[14px] md:text-[15px] leading-[1.6] text-neutral-600">
              {explanation}
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}
