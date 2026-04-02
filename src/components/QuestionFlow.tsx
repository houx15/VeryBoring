'use client';

import { useState, useCallback } from 'react';
import type { Question } from '@/lib/types';
import { OptionButton } from '@/components/ui/OptionButton';
import { Button } from '@/components/ui/Button';
import { PageContainer } from '@/components/layout/PageContainer';

interface QuestionFlowProps {
  questions: Question[];
  onComplete: (answers: Record<string, string>) => void;
}

export function QuestionFlow({ questions, onComplete }: QuestionFlowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const canGoBack = currentIndex > 0;
  const hasAnsweredCurrent = currentQuestion?.id ? answers[currentQuestion.id] !== undefined : false;

  const handleSelectOption = useCallback((optionId: string) => {
    if (!currentQuestion) return;
    
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));
    
    if (!isLastQuestion) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setIsTransitioning(false);
      }, 200);
    }
  }, [currentQuestion, isLastQuestion]);

  const handleBack = useCallback(() => {
    if (!canGoBack || isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(prev => prev - 1);
      setIsTransitioning(false);
    }, 200);
  }, [canGoBack, isTransitioning]);

  const handleComplete = useCallback(() => {
    onComplete(answers);
  }, [answers, onComplete]);

  if (!currentQuestion) {
    return null;
  }

  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-32">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          disabled={!canGoBack}
          className="px-8"
        >
          ← 返回
        </Button>
        <span className="text-sm text-neutral-500">
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      <div
        className={`transition-all duration-300 ease-smooth ${
          isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
        }`}
      >
        <h2 className="font-serif text-xl md:text-2xl text-foreground mb-32 animate-fade-in-up">
          {currentQuestion.text}
        </h2>

        <div className="flex flex-col gap-12 mb-32">
          {currentQuestion.options.map((option, index) => (
            <div
              key={option.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
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

        {isLastQuestion && hasAnsweredCurrent && (
          <div className="animate-fade-in-up">
            <Button
              variant="primary"
              size="default"
              onClick={handleComplete}
              className="w-full"
            >
              生成建议
            </Button>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
