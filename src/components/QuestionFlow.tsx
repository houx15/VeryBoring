'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Question } from '@/lib/types';
import { OptionButton } from '@/components/ui/OptionButton';
import { Button } from '@/components/ui/Button';
import { PageContainer } from '@/components/layout/PageContainer';
import { Icon } from '@/components/ui/Icon';

interface QuestionFlowProps {
  questions: Question[];
  onComplete: (data: { answers: Record<string, string>; context: string }) => void;
}

type Direction = 'forward' | 'backward';

export function QuestionFlow({ questions, onComplete }: QuestionFlowProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [context, setContext] = useState('');
  const [hasFocusedTextarea, setHasFocusedTextarea] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<Direction>('forward');
  const [showContextInput, setShowContextInput] = useState(false);
  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const hasAnsweredCurrent = currentQuestion?.id
    ? answers[currentQuestion.id] !== undefined
    : false;

  const clearAutoAdvanceTimer = useCallback(() => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
  }, []);

  const advanceToNext = useCallback(() => {
    setDirection('forward');
    setIsTransitioning(true);
    setShowContextInput(false);
    setContext('');
    setHasFocusedTextarea(false);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsTransitioning(false);
    }, 300);
  }, []);

  const handleSelectOption = useCallback(
    (optionId: string) => {
      if (!currentQuestion) return;

      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));
      setShowContextInput(true);

      // Set up auto-advance timer for non-last questions
      if (!isLastQuestion) {
        autoAdvanceTimerRef.current = setTimeout(() => {
          if (!hasFocusedTextarea) {
            advanceToNext();
          }
        }, 800);
      }
    },
    [currentQuestion, isLastQuestion, hasFocusedTextarea, advanceToNext],
  );

  const handleTextareaFocus = useCallback(() => {
    setHasFocusedTextarea(true);
    clearAutoAdvanceTimer();
  }, [clearAutoAdvanceTimer]);

  const handleTextareaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContext(e.target.value);
      setHasFocusedTextarea(true);
      clearAutoAdvanceTimer();
    },
    [clearAutoAdvanceTimer],
  );

  const handleBack = useCallback(() => {
    if (isTransitioning) return;

    clearAutoAdvanceTimer();

    if (currentIndex > 0) {
      setDirection('backward');
      setIsTransitioning(true);
      setShowContextInput(false);
      setContext('');
      setHasFocusedTextarea(false);
      setTimeout(() => {
        setCurrentIndex((prev) => prev - 1);
        setIsTransitioning(false);
      }, 300);
    } else {
      router.push('/');
    }
  }, [currentIndex, isTransitioning, router, clearAutoAdvanceTimer]);

  const handleComplete = useCallback(() => {
    clearAutoAdvanceTimer();
    onComplete({ answers, context });
  }, [answers, context, onComplete, clearAutoAdvanceTimer]);

  const handleManualNext = useCallback(() => {
    clearAutoAdvanceTimer();
    advanceToNext();
  }, [clearAutoAdvanceTimer, advanceToNext]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      clearAutoAdvanceTimer();
    };
  }, [clearAutoAdvanceTimer]);

  const getTransitionStyles = () => {
    if (!isTransitioning) {
      return 'translate-x-0 opacity-100';
    }
    if (direction === 'forward') {
      return '-translate-x-full opacity-0';
    }
    return 'translate-x-full opacity-0';
  };

  const getIncomingStyles = () => {
    if (!isTransitioning) {
      return 'translate-x-0 opacity-100';
    }
    if (direction === 'forward') {
      return 'translate-x-full opacity-0';
    }
    return '-translate-x-full opacity-0';
  };

  if (!currentQuestion) {
    return null;
  }

  return (
    <PageContainer>
      <div className="mb-32 flex items-center justify-center gap-12">
        {questions.map((_, index) => (
          <div
            key={index}
            className={`ease-smooth h-8 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-primary w-24'
                : index < currentIndex
                  ? 'bg-primary/50 w-8'
                  : 'w-8 bg-neutral-200'
            }`}
          />
        ))}
      </div>

      <div className="mb-32 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="hover:text-foreground gap-8 px-12 text-neutral-500"
        >
          <Icon name="ChevronLeft" size={18} />
          <span className="text-sm">{currentIndex === 0 ? '返回首页' : '上一题'}</span>
        </Button>
        <span className="text-sm font-medium text-neutral-400">
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      <div className="relative overflow-hidden">
        <div className={`ease-smooth transition-all duration-300 ${getTransitionStyles()}`}>
          <h2 className="text-foreground mb-32 font-serif text-xl leading-relaxed md:text-2xl">
            {currentQuestion.text}
          </h2>

          <div className="mb-32 flex flex-col gap-16">
            {currentQuestion.options.map((option, index) => (
              <div
                key={option.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <OptionButton
                  label={option.label}
                  icon={option.icon}
                  selected={answers[currentQuestion.id] === option.id}
                  onClick={() => handleSelectOption(option.id)}
                />
              </div>
            ))}
          </div>

          {showContextInput && hasAnsweredCurrent && (
            <div className="animate-fade-in-up">
              <div className="mb-24">
                <textarea
                  ref={textareaRef}
                  value={context}
                  onChange={handleTextareaChange}
                  onFocus={handleTextareaFocus}
                  placeholder="补充点什么..."
                  rows={2}
                  className="text-foreground focus:border-primary/40 focus:ring-primary/10 w-full resize-none rounded-lg border border-neutral-200 bg-white px-16 py-12 text-sm leading-relaxed transition-all duration-200 placeholder:text-neutral-400 focus:ring-2 focus:outline-none"
                />
              </div>

              {isLastQuestion ? (
                <Button
                  variant="primary"
                  size="default"
                  onClick={handleComplete}
                  className="animate-pulse-soft w-full gap-8"
                >
                  <Icon name="Sparkles" size={18} />
                  抽一张
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="default"
                  onClick={handleManualNext}
                  className="w-full gap-8"
                >
                  <span>继续</span>
                  <Icon name="ChevronRight" size={16} />
                </Button>
              )}
            </div>
          )}
        </div>

        {isTransitioning && (
          <div
            className={`ease-smooth absolute inset-0 transition-all duration-300 ${getIncomingStyles()}`}
          >
            <h2 className="text-foreground mb-32 font-serif text-xl leading-relaxed md:text-2xl">
              {questions[direction === 'forward' ? currentIndex + 1 : currentIndex - 1]?.text}
            </h2>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
