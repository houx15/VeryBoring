import type { Question } from '@/lib/types';

export const doQuestions: Question[] = [
  {
    id: 'type',
    text: '想动动手还是动动脑？',
    options: [
      { id: 'hands', label: '动动手', icon: '✋' },
      { id: 'brain', label: '动动脑', icon: '🧠' },
      { id: 'either', label: '都行', icon: '🎲' },
    ],
  },
  {
    id: 'social',
    text: '一个人还是想社交？',
    options: [
      { id: 'solo', label: '一个人', icon: '😌' },
      { id: 'social', label: '找朋友', icon: '👥' },
    ],
  },
  {
    id: 'time',
    text: '有多少时间？',
    options: [
      { id: '15min', label: '15分钟', icon: '⚡' },
      { id: '1hr', label: '一小时', icon: '🕐' },
      { id: 'awhile', label: '有的是时间', icon: '☕' },
    ],
  },
];
