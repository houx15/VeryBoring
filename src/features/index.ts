import { eatQuestions } from './eat/questions';
import { moveQuestions } from './move/questions';
import { doQuestions } from './do/questions';
import { goQuestions } from './go/questions';
import type { EntryType, Question } from '@/lib/types';

const questionSets: Record<EntryType, Question[]> = {
  eat: eatQuestions,
  move: moveQuestions,
  do: doQuestions,
  go: goQuestions,
};

export function getQuestions(entryType: EntryType): Question[] {
  return questionSets[entryType];
}

export const entryLabels: Record<EntryType, { title: string; icon: string }> = {
  eat: { title: '吃点东西', icon: 'Utensils' },
  move: { title: '来点运动', icon: 'Activity' },
  do: { title: '做点啥', icon: 'Sparkles' },
  go: { title: '去哪玩', icon: 'Compass' },
};

export { eatQuestions, moveQuestions, doQuestions, goQuestions };
