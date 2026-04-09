// --- Elements ---
export type Element = 'metal' | 'wood' | 'water' | 'fire' | 'earth';

export interface ElementConfig {
  id: Element;
  name: string;
  borderColor: string;
  tone: string;
}

// --- Symbols ---
export interface SymbolDefinition {
  id: string;
  name: string;
  element: Element;
}

// --- Cards ---
export interface DrawnCard {
  symbol: SymbolDefinition;
  position: number;
}

// --- Narrative ---
export type NarrativePhase = 'drawing' | 'intro' | 'playing' | 'note' | 'done';

export interface NarrativeOption {
  id: string;
  text: string;
}

export interface NarrativeStep {
  sceneText: string;
  options: NarrativeOption[];
  choiceId?: string;
  choiceText?: string;
}

export interface NarrativeContext {
  symbolName: string;
  element: Element;
  timeOfDay: string;
  dayOfWeek: string;
  season: string;
  weather?: string;
}

// --- Notes ---
export interface SavedNote {
  id: string;
  symbolName: string;
  element: Element;
  content: string;
  createdAt: string;
  season?: string;
  timeOfDay?: string;
}

// --- Settings ---
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
}
