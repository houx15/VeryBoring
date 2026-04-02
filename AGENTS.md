# AGENTS.md — Very Boring

## Project Overview

**Very Boring** is a "light decision entertainment" web app. When users are too lazy to decide, it delivers a single, actionable life snippet — not a list of options, not the optimal answer, just something "good enough to do right now."

### Four Core Entry Points
1. **Eat something** (吃点东西)
2. **Move a bit** (来点运动)
3. **Do something** (做点啥)
4. **Go somewhere** (去哪玩)

### How It Works
User answers 2-3 lightweight questions → system applies constraint filtering + random sampling → LLM generates an executable "life snippet" (action path, time estimate, light scene description).

### Key Product Principles
- Never show lists — single result only
- "Good enough", not optimal
- Output must be immediately actionable (a "micro-script", not a suggestion)
- Tone: casual, like a friend — "今天就这样吧"
- Chinese-primary UI

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router, Turbopack) | 16.x |
| Styling | Tailwind CSS | 4.x (CSS-first config via `@theme`) |
| Language | TypeScript (strict mode) | 5.x |
| Package Manager | pnpm | 10.x |
| Testing | Vitest + Testing Library | 3.x |
| Linting | ESLint (flat config) | 9.x |
| Formatting | Prettier + tailwindcss plugin | 3.x |
| LLM | OpenAI + Anthropic (user-provided keys) | — |
| Persistence | localStorage (MVP) | — |
| Deployment | Vercel + Docker (standalone) | — |

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
- H1: 32–48px | H2: 24–32px | H3: 18–22px | Body: 14–16px | Caption: 12–13px
- Line height: 1.4–1.6
- Use weight, not color, for hierarchy

### Color
- 1 primary, 1–2 secondary, neutral grayscale dominant
- Color only for: primary CTAs, status indicators, key emphasis
- No decorative gradients, no multi-color interfaces, neutral backgrounds

### Interaction
- Single-threaded: one goal, one piece of info, one action per screen
- Motion: 150–300ms, smooth easing, no bouncy animations
- One primary CTA per screen — no competing buttons
- Prefer modals for focused interactions, inline for flow

### Layout
- **Narrative pages**: full-width, centered, strong vertical rhythm
- **Functional pages**: grid-based (12-col), modular blocks, fast scannability

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
- **Components**: PascalCase (`DecisionCard.tsx`)
- **Hooks**: camelCase with `use` prefix (`useUserPreferences.ts`)
- **Utilities**: camelCase (`formatSnippet.ts`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`)
- **Types/Interfaces**: PascalCase (`UserPreferences`, `SnippetResult`)
- **Files**: match the export name — `DecisionCard.tsx` exports `DecisionCard`
- **Test files**: colocated as `Component.test.tsx` or in `__tests__/`

### Error Handling
- No empty catch blocks — always handle or explicitly re-throw
- Use Result/Either pattern or typed error classes for expected failures
- Never suppress errors with `catch (e) {}`
- Log errors with context (what was happening, what inputs caused it)
- User-facing errors should be friendly and in Chinese

### React Conventions
- Functional components only — no class components
- Colocate related files (component + styles + tests in same directory)
- Extract custom hooks for reusable stateful logic
- Prefer composition over prop drilling; use context sparingly
- Props interfaces defined inline or in same file as component

### API / Backend Conventions
- All API responses must be typed (request + response)
- Validate inputs at the boundary (API route handler)
- LLM prompts should be versioned and templated, not inline strings
- Keep prompt engineering in dedicated modules, not scattered in components

---

## Project Structure (Target)

```
src/
  app/              # Pages/routes (Next.js App Router)
  components/       # Shared UI components
  features/         # Feature modules (eat, move, do, go)
    eat/
      components/   # Feature-specific components
      hooks/        # Feature-specific hooks
      api/          # Feature-specific API calls
  lib/              # Shared utilities, helpers, constants
  types/            # Shared TypeScript types
  styles/           # Global styles, theme tokens
public/             # Static assets
docs/               # Documentation (PRD, WebVI)
```

---

## Commit Conventions

- Use conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`
- Keep commits atomic — one logical change per commit
- Write commit messages in English

---

## Key References

- **PRD**: `docs/PRD.md` — full product requirements
- **WebVI**: `docs/WebVI.md` — visual identity and design system
