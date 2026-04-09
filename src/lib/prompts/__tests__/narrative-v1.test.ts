import { describe, it, expect } from 'vitest';
import { buildStartPrompt, buildStepPrompt, buildConcludePrompt } from '../narrative-v1';
import type { NarrativeContext, NarrativeStep } from '@/lib/types';

function createMockContext(): NarrativeContext {
  return {
    symbolName: '镜',
    element: 'metal',
    timeOfDay: 'afternoon',
    dayOfWeek: '周三',
    season: '夏',
  };
}

function createMockStep(overrides: Partial<NarrativeStep> = {}): NarrativeStep {
  return {
    sceneText: '你站在一面古镜前，镜面泛着银光。',
    options: [
      { id: 'a', text: '伸手触碰镜面' },
      { id: 'b', text: '转身离开' },
    ],
    choiceId: 'a',
    choiceText: '伸手触碰镜面',
    ...overrides,
  };
}

describe('Narrative Prompts', () => {
  describe('buildStartPrompt()', () => {
    it('returns array of LLMMessage with system + user messages', () => {
      const context = createMockContext();
      const messages = buildStartPrompt(context);

      expect(messages).toHaveLength(2);
      expect(messages[0].role).toBe('system');
      expect(messages[1].role).toBe('user');
    });

    it('user message contains symbol name', () => {
      const context = createMockContext();
      const messages = buildStartPrompt(context);
      const userMessage = messages[1].content;

      expect(userMessage).toContain('镜');
    });

    it('user message contains JSON format instruction', () => {
      const context = createMockContext();
      const messages = buildStartPrompt(context);
      const userMessage = messages[1].content;

      expect(userMessage).toContain('sceneText');
      expect(userMessage).toContain('options');
      expect(userMessage).toContain('JSON');
    });

    it('system message contains core rules', () => {
      const context = createMockContext();
      const messages = buildStartPrompt(context);
      const systemMessage = messages[0].content;

      expect(systemMessage).toContain('叙事引导者');
      expect(systemMessage).toContain('JSON');
    });

    it('user message includes time context', () => {
      const context = createMockContext();
      const messages = buildStartPrompt(context);
      const userMessage = messages[1].content;

      expect(userMessage).toContain('周三');
      expect(userMessage).toContain('夏');
    });
  });

  describe('buildStepPrompt()', () => {
    it('returns system + history + current messages', () => {
      const context = createMockContext();
      const history: NarrativeStep[] = [createMockStep()];
      const messages = buildStepPrompt(context, history, 'a', '伸手触碰镜面');

      // system + 1 assistant (scene) + 1 user (choice) + 1 user (current)
      expect(messages.length).toBeGreaterThanOrEqual(3);
      expect(messages[0].role).toBe('system');
    });

    it('includes history messages', () => {
      const context = createMockContext();
      const step1 = createMockStep({ sceneText: '场景一' });
      const step2 = createMockStep({
        sceneText: '场景二',
        choiceText: '继续前进',
      });
      const history = [step1, step2];
      const messages = buildStepPrompt(context, history, 'a', '新的选择');

      const allContent = messages.map((m) => m.content).join('|');
      expect(allContent).toContain('场景一');
      expect(allContent).toContain('场景二');
    });

    it('current user message contains choice text', () => {
      const context = createMockContext();
      const history = [createMockStep()];
      const messages = buildStepPrompt(context, history, 'b', '转身离开');

      const lastUserMsg = messages.filter((m) => m.role === 'user').pop();
      expect(lastUserMsg?.content).toContain('转身离开');
    });
  });

  describe('buildConcludePrompt()', () => {
    it('returns messages for note generation', () => {
      const context = createMockContext();
      const history: NarrativeStep[] = [
        createMockStep({ sceneText: '开场' }),
        createMockStep({ sceneText: '中段', choiceText: '继续' }),
      ];
      const messages = buildConcludePrompt(context, history);

      expect(messages).toHaveLength(2);
      expect(messages[0].role).toBe('system');
      expect(messages[1].role).toBe('user');
    });

    it('system message includes note rules', () => {
      const context = createMockContext();
      const history = [createMockStep()];
      const messages = buildConcludePrompt(context, history);
      const systemMessage = messages[0].content;

      expect(systemMessage).toContain('小纸条');
      expect(systemMessage).toContain('第二人称');
    });

    it('user message includes narrative history', () => {
      const context = createMockContext();
      const history: NarrativeStep[] = [
        createMockStep({ sceneText: '古镜前的场景', choiceText: '触碰镜面' }),
      ];
      const messages = buildConcludePrompt(context, history);
      const userMessage = messages[1].content;

      expect(userMessage).toContain('古镜前的场景');
      expect(userMessage).toContain('触碰镜面');
    });

    it('user message includes symbol name and element tone', () => {
      const context = createMockContext();
      const history = [createMockStep()];
      const messages = buildConcludePrompt(context, history);
      const userMessage = messages[1].content;

      expect(userMessage).toContain('镜');
      expect(userMessage).toContain('精确');
    });
  });
});
