import type { Question } from '@/lib/types';

export const goQuestions: Question[] = [
  {
    id: 'distance',
    text: '想近一点还是远一点？',
    options: [
      { id: 'near', label: '附近就行', icon: '📍' },
      { id: 'far', label: '远一点也行', icon: '🚗' },
    ],
  },
  {
    id: 'environment',
    text: '想自然还是城市？',
    options: [
      { id: 'nature', label: '亲近自然', icon: '🌿' },
      { id: 'city', label: '城市里逛', icon: '🏙️' },
      { id: 'either', label: '都行', icon: '🎲' },
    ],
  },
  {
    id: 'budget',
    text: '多少预算？',
    options: [
      { id: 'free', label: '免费的', icon: '🆓' },
      { id: 'some', label: '花点也行', icon: '💰' },
      { id: 'noplimit', label: '无所谓', icon: '🎯' },
    ],
  },
];
