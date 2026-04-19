# Very Boring

> 抽一张牌，讲一段故事。

A card-draw narrative game. Open the app, draw 5 cards from a deck of 50 symbols across 5 elements, pick one, and let the LLM guide you through a short narrative. At the end, you receive a crumpled note -- a secret whispered to you. Collect it or discard it.

**[Live Demo](#)** · **[PRD](docs/PRD-v2.md)** · **[Design System](docs/WebVI.md)**

---

## What It Does

The core loop:

1. **Open** -- a fresh deck of 50 symbols awaits
2. **Draw 5 cards** -- the system selects 5 symbols with element diversity (max 2 per element)
3. **Pick one** -- tap the symbol that calls to you
4. **Narrative unfolds** -- 3-5 steps of branching story, guided by LLM
5. **Crumpled note** -- the story ends with a secret, whispered to you
6. **Collect or discard** -- save the note to your collection, or let it go

The 50 symbols span 5 elements:

| Element    | Symbol | Tone                          |
| ---------- | ------ | ----------------------------- |
| [Hexagon]  | Metal  | Precise, structured, orderly  |
| [TreePine] | Wood   | Growing, natural, organic     |
| [Waves]    | Water  | Flowing, emotional, intuitive |
| [Flame]    | Fire   | Energetic, active, passionate |
| [Mountain] | Earth  | Grounded, stable, warm        |

Each symbol has a unique SVG pattern and a single-character Chinese name.

**Key principle**: Single thread. One card. One story. One note.

---

## Tech Stack

| Layer           | Technology                                                  | Version |
| --------------- | ----------------------------------------------------------- | ------- |
| Framework       | [Next.js](https://nextjs.org/) (App Router, Turbopack)      | 16.x    |
| Styling         | [Tailwind CSS](https://tailwindcss.com/) (CSS-first config) | 4.x     |
| Language        | [TypeScript](https://www.typescriptlang.org/) (strict mode) | 5.x     |
| Icons           | [Lucide React](https://lucide.dev/)                         | 1.x     |
| Package Manager | [pnpm](https://pnpm.io/)                                    | 10.x    |
| Testing         | [Vitest](https://vitest.dev/) + Testing Library             | 3.x     |
| Linting         | [ESLint](https://eslint.org/) (flat config)                 | 9.x     |
| Formatting      | [Prettier](https://prettier.io/) + tailwindcss plugin       | 3.x     |
| Deployment      | Vercel / Docker (standalone)                                | --      |

### LLM Providers

9 providers supported out of the box. Users bring their own API keys:

| Provider                   | Protocol          | Default Model              |
| -------------------------- | ----------------- | -------------------------- |
| **OpenAI**                 | OpenAI            | `gpt-4.1-mini`             |
| **Claude** (Anthropic)     | Anthropic         | `claude-sonnet-4-20250514` |
| **Gemini** (Google)        | OpenAI-compatible | `gemini-2.5-flash`         |
| **Kimi** (Moonshot)        | OpenAI-compatible | `moonshot-v1-128k`         |
| **Qwen** (Alibaba)         | OpenAI-compatible | `qwen3-235b-a22b`          |
| **DeepSeek**               | OpenAI-compatible | `deepseek-chat`            |
| **GLM** (Zhipu)            | OpenAI-compatible | `glm-4-flash`              |
| **Volcengine** (ByteDance) | OpenAI-compatible | `doubao-1.5-pro-256k`      |
| **MiniMax**                | OpenAI-compatible | `MiniMax-M1`               |

All providers use either the OpenAI or Anthropic protocol with configurable base URL, model, and API key.

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 10+

### Install & Run

```bash
# Clone the repository
git clone <repo-url>
cd VeryBoring

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Configure LLM

1. Click the gear icon in the footer (or navigate to `/settings`)
2. Select a provider
3. Enter your API key
4. Pick a model (or type a custom one)
5. Click **Save & Test** -- the app will verify connectivity before saving

Settings are stored in your browser's localStorage. No server-side storage.

---

## Project Structure

```
src/
  app/                              # Next.js App Router pages
    page.tsx                        # Home -- card draw screen
    layout.tsx                      # Root layout with metadata
    globals.css                     # Theme tokens + animations
    favicon.ico
    notes/page.tsx                  # Notes collection
    settings/page.tsx               # Redirects to / (settings is a modal)
    api/
      narrative/
        start/route.ts              # Generate first narrative scene
        step/route.ts               # Continue narrative with choice
        conclude/route.ts           # Generate crumpled note
      test-connection/route.ts      # Provider connectivity test
  components/
    CardDraw.tsx                    # 5-card draw animation + selection
    Card.tsx                        # Individual card with SVG symbol
    NarrativeGame.tsx               # Main game orchestrator
    NarrativeScene.tsx              # Scene text display
    NarrativeChoice.tsx             # Two-option choice buttons
    NoteCard.tsx                    # Crumpled note display
    ClientLayout.tsx                # Client wrapper (SettingsProvider, auto-open)
    Footer.tsx                      # Footer with nav links
    SettingsModal.tsx               # LLM provider configuration modal
    layout/
      index.ts                      # Barrel export
      PageContainer.tsx             # Max-width container
      Section.tsx                   # Spacing section
    ui/
      index.ts                      # Barrel export
      Button.tsx                    # Base button
      Card.tsx                      # Base card wrapper
      Icon.tsx                      # Lucide icon wrapper
      OptionButton.tsx              # Choice option button
  context/
    SettingsContext.tsx              # Settings modal open/close state
  hooks/
    useTypewriter.ts                # Typewriter text animation
    useSSEStream.ts                 # Server-sent events streaming
  lib/
    llm/
      providers.ts                  # Provider registry (9 providers)
      provider.ts                   # createProvider() factory
      openai.ts                     # OpenAI-compatible protocol
      anthropic.ts                  # Anthropic protocol
      errors.ts                     # Typed LLM errors
      index.ts                      # Barrel export
    symbols/
      definitions.ts                # 50 symbol definitions (10 per element)
      elements.ts                   # 5 element configs with tones
      svg-patterns.tsx              # SVG components for each symbol
      utils.ts                      # drawCards(), getSymbolById()
      index.ts                      # Barrel export
      __tests__/symbols.test.ts
    context/
      narrative-context.ts          # Time/season/day context builder
      __tests__/narrative-context.test.ts
    prompts/
      narrative-v1.ts               # Prompt templates (start/step/conclude)
      __tests__/narrative-v1.test.ts
    storage/
      helpers.ts                    # localStorage helpers
      settings.ts                   # Settings CRUD
      notes.ts                      # Notes collection CRUD
      index.ts                      # Barrel export
      __tests__/notes.test.ts
    types/
      index.ts                      # Shared TypeScript types
  test/
    setup.ts                        # Test configuration
docs/
  PRD.md                            # Product requirements v1 (archived)
  PRD-v2.md                         # Product requirements v2 (current)
  WebVI.md                          # Visual identity & design system
```

---

## Scripts

```bash
pnpm dev              # Development server (Turbopack)
pnpm build            # Production build
pnpm start            # Start production server
pnpm lint             # ESLint
pnpm typecheck        # TypeScript type checking (tsc --noEmit)
pnpm test             # Run all tests (Vitest)
pnpm test:watch       # Run tests in watch mode
pnpm test -- path/to/test.test.ts   # Run single test file
```

---

## Design System -- "Calm Functionalism"

The UI follows a "Calm Functionalism with warmth" aesthetic inspired by Apple's design philosophy:

- **8px grid** -- all spacing is a multiple of 8
- **Warm palette** -- olive primary (`#7A7B5C`), terracotta accent (`#C8956A`), warm neutrals
- **No emojis** -- Lucide icons exclusively
- **Single-threaded interaction** -- one goal, one action per screen
- **Card draw animation** -- 5 cards shuffle and fan out, tap to select
- **Motion**: 150-300ms, smooth easing, no bouncy animations
- **Typography**: serif headings, sans-serif body, weight-based hierarchy

Full spec in [`docs/WebVI.md`](docs/WebVI.md).

---

## How It Works

```
User opens app
       |
       v
5 cards drawn (random, element-diverse)
       |
       v
User taps one card
       |
       v
LLM generates first scene (with 2 choices)
       |
       v
User picks a choice --> LLM continues story (3-5 steps)
       |
       v
LLM generates "crumpled note" (the ending)
       |
       v
User collects or discards the note
       |
       v
Collection view shows saved notes
```

### Card Draw System

The deck has 50 symbols: 10 per element (metal, wood, water, fire, earth). On each draw, the system shuffles the deck and selects 5 symbols with element diversity -- no more than 2 cards of the same element. Each symbol has a unique SVG pattern rendered in the element's border color.

### Narrative Context

Each story is contextualized by time: time of day (dawn, morning, afternoon, evening, night), day of week, and season. The element's tone influences the narrative voice -- metal is precise and structured, fire is energetic and bright.

### Crumpled Note

The final output is a "crumpled note" -- 1-3 sentences, second person, like a friend whispering a secret. It is specific and actionable, but not a to-do list.

### Connection Test

On saving provider settings, the app sends a minimal request to verify the API key, base URL, and model are correctly configured.

---

## Architecture Decisions

| Decision                       | Rationale                                                          |
| ------------------------------ | ------------------------------------------------------------------ |
| **User-provided API keys**     | No server-side secrets. Users own their data and usage.            |
| **localStorage only**          | MVP -- no auth, no database. Simple and private.                   |
| **Dual protocol support**      | OpenAI protocol covers 8/9 providers. Anthropic for Claude.        |
| **CSS-first Tailwind 4**       | `@theme inline` in globals.css -- no tailwind.config.ts needed.    |
| **Symbol SVG patterns**        | Hand-drawn SVGs for each symbol, no icon library dependency.       |
| **Element diversity in draws** | Max 2 same-element cards ensures variety in each 5-card draw.      |
| **Prompt versioning**          | Prompts in dedicated modules (`narrative-v1`), not inline strings. |
| **SSE streaming**              | Server-sent events for real-time narrative text delivery.          |

---

## License

Private project. All rights reserved.
