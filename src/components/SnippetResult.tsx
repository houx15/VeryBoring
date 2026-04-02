'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';

interface SnippetResultProps {
  snippetText: string;
  onAccept: () => void;
  onRegenerate: (feedback?: string) => void;
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
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleRegenerateClick = useCallback(() => {
    setShowFeedback(true);
  }, []);

  const handleSkipFeedback = useCallback(() => {
    setShowFeedback(false);
    setFeedback('');
    onRegenerate();
  }, [onRegenerate]);

  const handleSubmitFeedback = useCallback(() => {
    setShowFeedback(false);
    onRegenerate(feedback);
    setFeedback('');
  }, [onRegenerate, feedback]);

  const handleFeedbackChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  }, []);

  return (
    <div className="w-full">
      <div className="mb-32 flex items-center justify-center gap-12">
        <div className="to-primary/30 h-px w-24 bg-gradient-to-r from-transparent" />
        <Icon name="Sparkles" size={20} className="text-primary/60" />
        <h2 className="text-primary font-serif text-[22px] leading-relaxed md:text-[26px]">
          今天就这样吧
        </h2>
        <Icon name="Sparkles" size={20} className="text-primary/60" />
        <div className="to-primary/30 h-px w-24 bg-gradient-to-l from-transparent" />
      </div>

      <div className="animate-card-reveal relative mb-32">
        <div className="bg-primary/5 absolute -inset-4 rounded-2xl" />
        <div className="animate-shimmer absolute inset-0 rounded-xl" />
        <Card className="border-primary/20 shadow-primary/5 relative border bg-white px-28 py-32 shadow-lg">
          <p className="text-foreground text-[19px] leading-[1.7] font-medium tracking-wide md:text-[21px]">
            {snippetText}
          </p>
        </Card>
      </div>

      <div className="mb-24 flex flex-col gap-12">
        <Button
          variant="primary"
          size="default"
          onClick={onAccept}
          className="duration-fast hover:shadow-primary/20 w-full transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
        >
          <span className="flex items-center justify-center gap-10">
            <Icon name="Check" size={18} strokeWidth={2.5} />
            就这个
          </span>
        </Button>

        {!showFeedback && (
          <Button
            variant="secondary"
            size="default"
            onClick={handleRegenerateClick}
            loading={isRegenerating}
            disabled={isRegenerating}
            className="duration-fast hover:border-primary/40 hover:bg-primary/5 w-full transition-all"
          >
            <span className="flex items-center justify-center gap-10">
              <Icon name="RefreshCw" size={18} />
              换一个
            </span>
          </Button>
        )}

        {showFeedback && !isRegenerating && (
          <div className="animate-fade-in-up border-primary/10 bg-primary/[0.02] rounded-lg border p-20">
            <p className="text-foreground mb-16 text-sm font-medium">有什么不满意的？</p>
            <textarea
              value={feedback}
              onChange={handleFeedbackChange}
              placeholder="比如：不想做饭，想出去走走..."
              rows={2}
              className="text-foreground focus:border-primary/40 focus:ring-primary/10 mb-16 w-full resize-none rounded-lg border border-neutral-200 bg-white px-16 py-12 text-sm leading-relaxed transition-all duration-200 placeholder:text-neutral-400 focus:ring-2 focus:outline-none"
            />
            <div className="flex flex-col gap-12">
              <Button
                variant="primary"
                size="default"
                onClick={handleSubmitFeedback}
                className="w-full"
              >
                带上意见重新生成
              </Button>
              <Button
                variant="ghost"
                size="default"
                onClick={handleSkipFeedback}
                className="text-neutral-500"
              >
                算了，直接换
              </Button>
            </div>
          </div>
        )}

        <Button
          variant="ghost"
          size="default"
          onClick={onExplain}
          loading={isExplaining}
          disabled={isExplaining}
          className="duration-fast hover:bg-primary/5 hover:text-primary w-full transition-all"
        >
          <span className="flex items-center justify-center gap-10">
            <Icon name="HelpCircle" size={18} />
            为什么
          </span>
        </Button>
      </div>

      {explanation && (
        <div className="animate-fade-in-up">
          <div className="border-primary/40 bg-primary/[0.03] rounded-lg border-l-4 px-24 py-20">
            <div className="text-primary/70 mb-12 flex items-center gap-8">
              <Icon name="Info" size={16} />
              <span className="text-xs font-medium tracking-wider uppercase">为什么选这个</span>
            </div>
            <p className="text-[15px] leading-[1.7] text-neutral-600">{explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
