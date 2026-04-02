import type { Question } from '@/lib/types';

export const eatQuestions: Question[] = [
  {
    id: 'location',
    text: '想在家还是出门？',
    options: [
      { id: 'home', label: '在家做', icon: 'Home' },
      { id: 'out', label: '出门吃', icon: 'DoorOpen' },
    ],
  },
  {
    id: 'ingredients',
    text: '有现成食材吗？',
    options: [
      { id: 'yes', label: '有食材', icon: 'Leaf' },
      { id: 'no', label: '啥也没有', icon: 'HelpCircle' },
    ],
  },
  {
    id: 'taste',
    text: '想清淡还是重一点？',
    options: [
      { id: 'light', label: '清淡点', icon: 'Coffee' },
      { id: 'heavy', label: '来点重口', icon: 'Flame' },
    ],
  },
];
