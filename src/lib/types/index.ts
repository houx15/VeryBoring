export type EntryType = 'eat' | 'move' | 'do' | 'go';

export interface ProviderDefinition {
  id: string;
  name: string;
  protocol: 'openai' | 'anthropic';
  baseUrl: string;
  defaultModel: string;
  models: string[];
  placeholder: string;
}

export interface UserSettings {
  provider: string;
  apiKey: string;
  model: string;
  baseUrl: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  diet?: 'light' | 'heavy' | 'none';
  activity?: 'home' | 'outdoor';
  budget?: 'low' | 'medium' | 'high';
  exerciseLevel?: 'light' | 'moderate' | 'intense';
}

export interface QuestionOption {
  id: string;
  label: string;
  icon?: string;
}

export interface QuestionCondition {
  questionId: string;
  answerIds: string[];
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
  followUp?: Record<string, string>;
  condition?: QuestionCondition;
}

export interface SnippetResult {
  actionPath: string;
  timeEstimate: string;
  sceneDescription: string;
  rawResponse: string;
}

export interface HistoryEntry {
  id: string;
  entryType: EntryType;
  answers: Record<string, string>;
  snippet: SnippetResult;
  accepted: boolean;
  timestamp: number;
}
