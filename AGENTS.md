# AGENTS.md — Very Boring

## Project Overview

**Very Boring** is a card-draw narrative game. Open the app, draw 5 cards from a deck of 50 symbols across 5 elements (metal, wood, water, fire, earth), pick one, and let the LLM guide you through a short narrative. At the end, you receive a crumpled note — a secret whispered to you. Collect it or discard it.

### Core Loop

1. **Open** — a fresh deck of 50 symbols awaits
2. **Draw 5 cards** — the system selects 5 symbols with element diversity (max 2 per element)
3. **Pick one** — tap the symbol that calls to you
4. **Narrative unfolds** — 3-5 steps of branching story, guided by LLM
5. **Crumpled note** — the story ends with a secret, whispered to you
6. **Collect or discard** — save the note to your collection, or let it go

### Key Product Principles

- Single thread — one card, one story, one note
- Ritual over efficiency — every step has rhythm and pacing
- Discovery over recommendation — the note is a secret, not an instruction
- Good enough, not perfect — random draw with elemental depth
- Tone: casual, like a friend whispering
- Chinese-primary UI
- 2-3 minute experience, then close the tab

---

## Tech Stack

| Layer           | Technology                                                     | Version                             |
| --------------- | -------------------------------------------------------------- | ----------------------------------- |
| Framework       | Next.js (App Router, Turbopack)                                | 16.x                                |
| Styling         | Tailwind CSS                                                   | 4.x (CSS-first config via `@theme`) |
| Language        | TypeScript (strict mode)                                       | 5.x                                 |
| Icons           | Lucide React                                                   | 1.x                                 |
| Package Manager | pnpm                                                           | 10.x                                |
| Testing         | Vitest + Testing Library                                       | 3.x                                 |
| Linting         | ESLint (flat config)                                           | 9.x                                 |
| Formatting      | Prettier + tailwindcss plugin                                  | 3.x                                 |
| LLM             | OpenAI + Anthropic protocols (user-provided keys, 9 providers) | —                                   |
| Persistence     | localStorage (MVP)                                             | —                                   |
| Deployment      | Vercel + Docker (standalone)                                   | —                                   |

---

## Build / Dev / Test Commands

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Lint
pnpm lint

# Type check
pnpm typecheck          # or: tsc --noEmit

# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run a single test file
pnpm test -- path/to/test.test.ts

# Run a single test by name
pnpm test -- -t "test name pattern"

# Build for production
pnpm build
```

---

## Design System — "Calm Functionalism"

All UI work MUST follow the Web Visual Identity (WebVI) defined in `docs/WebVI.md`.

### Core Tenets

- **Clarity over decoration** — visual elements communicate structure, not style
- **Focus over abundance** — remove anything competing for attention
- **Timing over richness** — interactions appear only when needed

### Spacing

- Base unit: **8px** — all spacing must be multiples of 8
- Section: 64–120px | Block: 24–40px | Element: 8–16px

### Typography

- Max 2 font families (serif for headings, sans-serif for body)
- H1: 32–56px | H2: 24–32px | Body: 14–18px | Caption: 12–13px
- Line height: 1.4–1.6
- Use weight, not color, for hierarchy

### Color

- Warm palette: olive primary (`#7A7B5C`), terracotta accent (`#C8956A`), warm neutrals
- Color only for: primary CTAs, status indicators, element accents, key emphasis
- No decorative gradients, neutral backgrounds (`#f8f7f5`)

### Interaction

- Single-threaded: one goal, one piece of info, one action per screen
- Motion: 150–300ms, smooth easing, no bouncy animations
- One primary CTA per screen — no competing buttons
- Prefer modals for focused interactions (settings), inline for flow (narrative)

### Layout

- **Card draw**: centered, strong vertical rhythm, animated card reveals
- **Narrative flow**: full-width, centered, typewriter text reveal
- **Notes collection**: grid-based, expandable cards

---

## Code Style Guidelines

### General

- **TypeScript strict mode** — no `any`, no `@ts-ignore`, no `@ts-expect-error`
- Prefer `interface` for object shapes, `type` for unions/intersections
- Use `const` by default; `let` only when reassignment is needed
- Prefer immutability — `readonly`, `as const`, `ReadonlyArray` where appropriate

### Imports

- Group imports: (1) external packages, (2) internal modules, (3) types
- Use path aliases if configured (e.g., `@/components/...`)
- No barrel imports unless the module explicitly exports a barrel
- Prefer named imports over default imports

### Formatting

- Indent: 2 spaces (no tabs)
- Single quotes for strings, double quotes only in JSX attributes
- Trailing commas in multi-line structures
- Semicolons required
- Max line length: 100 characters
- Use Prettier — do not format manually

### Naming Conventions

- **Components**: PascalCase (`CardDraw.tsx`)
- **Hooks**: camelCase with `use` prefix (`useTypewriter.ts`)
- **Utilities**: camelCase (`drawCards.ts`)
- **Constants**: UPPER_SNAKE_CASE (`REVEAL_DELAY`)
- **Types/Interfaces**: PascalCase (`DrawnCard`, `NarrativePhase`)
- **Files**: match the export name — `CardDraw.tsx` exports `CardDraw`
- **Test files**: colocated in `__tests__/` directories

### Error Handling

- No empty catch blocks — always handle or explicitly re-throw
- Use typed error classes for LLM failures (`LLMError`, `LLMConnectionError`)
- Never suppress errors with `catch (e) {}`
- Log errors with context (what was happening, what inputs caused it)
- User-facing errors should be friendly and in Chinese

### React Conventions

- Functional components only — no class components
- Colocate related files (component + tests in same directory)
- Extract custom hooks for reusable stateful logic (e.g., `useTypewriter`, `useSSEStream`)
- Prefer composition over prop drilling; use context sparingly (only `SettingsContext` currently)
- Props interfaces defined inline or in same file as component

### API / Backend Conventions

- All API responses must be typed (request + response)
- Validate inputs at the boundary (API route handler)
- LLM prompts should be versioned and templated (`narrative-v1`), not inline strings
- Keep prompt engineering in dedicated modules (`lib/prompts/`), not scattered in components
- SSE streaming for real-time narrative delivery

---

## Project Structure

```
src/
  app/                              # Next.js App Router pages
    page.tsx                        # Home — card draw screen
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
    prompts/
      narrative-v1.ts               # Prompt templates (start/step/conclude)
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

## Commit Conventions

- Use conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`
- Keep commits atomic — one logical change per commit
- Write commit messages in English

---

## Key References

- **PRD (current)**: `docs/PRD-v2.md` — full product requirements (card-draw narrative game)
- **PRD (v1, archived)**: `docs/PRD.md` — original product concept (superseded by v2)
- **WebVI**: `docs/WebVI.md` — visual identity and design system
