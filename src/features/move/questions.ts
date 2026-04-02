import type { Question } from '@/lib/types';

export const moveQuestions: Question[] = [
  {
    id: 'time',
    text: '有多少时间？',
    options: [
      { id: '10min', label: '10分钟', icon: 'Zap' },
      { id: '30min', label: '半小时', icon: 'Clock' },
      { id: '1hr', label: '一小时', icon: 'Timer' },
    ],
  },
  {
    id: 'location',
    text: '想出门吗？',
    options: [
      { id: 'yes', label: '想出去', icon: 'Sun' },
      { id: 'no', label: '就在家', icon: 'Lamp' },
    ],
  },
  {
    id: 'intensity',
    text: '想轻松还是稍微累一点？',
    options: [
      { id: 'light', label: '轻松就好', icon: 'Flower2' },
      { id: 'intense', label: '出点汗', icon: 'Dumbbell' },
    ],
  },
];
