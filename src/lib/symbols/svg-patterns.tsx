import type { FC } from 'react';

export interface SymbolSVGProps {
  size?: number;
  color?: string;
}

// Metal -- sharp angles, straight lines, precise geometry, mirror-like symmetry

export const MirrorSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <line x1="40" y1="10" x2="40" y2="70" stroke={color} strokeWidth={1.5} />
    <path d="M40 15 C28 15 20 25 20 40 C20 55 28 65 40 65" stroke={color} strokeWidth={1.5} />
    <path d="M40 15 C52 15 60 25 60 40 C60 55 52 65 40 65" stroke={color} strokeWidth={1.5} />
    <circle cx="40" cy="40" r="3" fill={color} />
  </svg>
);

export const BladeSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path d="M40 8 L48 50 L40 72 L32 50 Z" stroke={color} strokeWidth={1.5} />
    <line x1="20" y1="50" x2="60" y2="50" stroke={color} strokeWidth={1} />
    <line x1="40" y1="8" x2="40" y2="72" stroke={color} strokeWidth={0.5} />
  </svg>
);

export const BellSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path d="M24 55 C24 30 32 18 40 15 C48 18 56 30 56 55" stroke={color} strokeWidth={1.5} />
    <line x1="20" y1="55" x2="60" y2="55" stroke={color} strokeWidth={1.5} />
    <circle cx="40" cy="62" r="3" fill={color} />
    <line x1="40" y1="15" x2="40" y2="8" stroke={color} strokeWidth={1} />
  </svg>
);

export const LockSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <rect x="24" y="38" width="32" height="28" rx="2" stroke={color} strokeWidth={1.5} />
    <path
      d="M30 38 L30 28 C30 20 35 14 40 14 C45 14 50 20 50 28 L50 38"
      stroke={color}
      strokeWidth={1.5}
    />
    <circle cx="40" cy="50" r="4" fill={color} />
    <line x1="40" y1="54" x2="40" y2="60" stroke={color} strokeWidth={1.5} />
  </svg>
);

export const NeedleSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <line x1="40" y1="8" x2="40" y2="72" stroke={color} strokeWidth={1} />
    <circle cx="40" cy="22" r="4" stroke={color} strokeWidth={1.5} />
    <line x1="37" y1="22" x2="43" y2="22" stroke={color} strokeWidth={1} />
    <path d="M36 72 L40 68 L44 72" stroke={color} strokeWidth={1} />
  </svg>
);

export const CrownSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path d="M18 55 L18 35 L30 45 L40 25 L50 45 L62 35 L62 55 Z" stroke={color} strokeWidth={1.5} />
    <line x1="18" y1="55" x2="62" y2="55" stroke={color} strokeWidth={1.5} />
    <circle cx="18" cy="35" r="2" fill={color} />
    <circle cx="40" cy="25" r="2" fill={color} />
    <circle cx="62" cy="35" r="2" fill={color} />
  </svg>
);

export const ChainSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <ellipse cx="30" cy="30" rx="10" ry="14" stroke={color} strokeWidth={1.5} />
    <ellipse cx="50" cy="40" rx="10" ry="14" stroke={color} strokeWidth={1.5} />
    <ellipse cx="30" cy="54" rx="10" ry="14" stroke={color} strokeWidth={1.5} />
  </svg>
);

export const CoinSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <circle cx="40" cy="40" r="28" stroke={color} strokeWidth={1.5} />
    <circle cx="40" cy="40" r="22" stroke={color} strokeWidth={0.5} />
    <rect x="34" y="34" width="12" height="12" stroke={color} strokeWidth={1} />
    <line x1="40" y1="28" x2="40" y2="52" stroke={color} strokeWidth={0.5} />
    <line x1="28" y1="40" x2="52" y2="40" stroke={color} strokeWidth={0.5} />
  </svg>
);

export const SteleSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <rect x="28" y="10" width="24" height="60" rx="1" stroke={color} strokeWidth={1.5} />
    <line x1="30" y1="25" x2="50" y2="25" stroke={color} strokeWidth={1} />
    <line x1="30" y1="40" x2="50" y2="40" stroke={color} strokeWidth={1} />
    <line x1="30" y1="55" x2="50" y2="55" stroke={color} strokeWidth={1} />
    <path d="M38 30 L40 35 L42 30" stroke={color} strokeWidth={0.75} />
  </svg>
);

export const DaggerSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path d="M40 8 L44 45 L40 50 L36 45 Z" stroke={color} strokeWidth={1.5} />
    <line x1="24" y1="45" x2="56" y2="45" stroke={color} strokeWidth={1.5} />
    <line x1="40" y1="45" x2="40" y2="70" stroke={color} strokeWidth={1.5} />
    <circle cx="40" cy="70" r="2" fill={color} />
  </svg>
);

// Wood -- organic curves, branching patterns, spiral growth, concentric rings

export const TreeSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <line x1="40" y1="70" x2="40" y2="35" stroke={color} strokeWidth={1.5} />
    <path d="M40 35 C40 25 30 20 22 15" stroke={color} strokeWidth={1} />
    <path d="M40 35 C40 25 50 20 58 15" stroke={color} strokeWidth={1} />
    <path d="M40 45 C40 38 32 35 25 32" stroke={color} strokeWidth={1} />
    <path d="M40 45 C40 38 48 35 55 32" stroke={color} strokeWidth={1} />
    <circle cx="22" cy="15" r="2" fill={color} />
    <circle cx="58" cy="15" r="2" fill={color} />
    <circle cx="25" cy="32" r="1.5" fill={color} />
    <circle cx="55" cy="32" r="1.5" fill={color} />
  </svg>
);

export const ForestSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <line x1="20" y1="70" x2="20" y2="30" stroke={color} strokeWidth={1} />
    <line x1="40" y1="70" x2="40" y2="18" stroke={color} strokeWidth={1} />
    <line x1="60" y1="70" x2="60" y2="35" stroke={color} strokeWidth={1} />
    <path d="M20 30 C16 24 14 18 18 12" stroke={color} strokeWidth={1} />
    <path d="M20 30 C24 24 26 18 22 12" stroke={color} strokeWidth={1} />
    <path d="M40 18 C36 12 34 8 38 5" stroke={color} strokeWidth={1} />
    <path d="M40 18 C44 12 46 8 42 5" stroke={color} strokeWidth={1} />
    <path d="M60 35 C56 28 54 22 58 16" stroke={color} strokeWidth={1} />
    <path d="M60 35 C64 28 66 22 62 16" stroke={color} strokeWidth={1} />
  </svg>
);

export const BranchSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path d="M15 65 C25 55 35 40 40 30" stroke={color} strokeWidth={1.5} />
    <path d="M40 30 C45 22 52 16 60 12" stroke={color} strokeWidth={1} />
    <path d="M40 30 C38 20 36 12 38 5" stroke={color} strokeWidth={1} />
    <path d="M40 30 C48 28 55 30 65 28" stroke={color} strokeWidth={1} />
    <circle cx="60" cy="12" r="2" fill={color} />
    <circle cx="38" cy="5" r="2" fill={color} />
    <circle cx="65" cy="28" r="2" fill={color} />
  </svg>
);

export const RootSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <line x1="40" y1="10" x2="40" y2="40" stroke={color} strokeWidth={1.5} />
    <path d="M40 40 C35 50 25 58 15 65" stroke={color} strokeWidth={1} />
    <path d="M40 40 C42 52 38 62 30 72" stroke={color} strokeWidth={1} />
    <path d="M40 40 C45 50 55 58 65 65" stroke={color} strokeWidth={1} />
    <path d="M40 40 C38 52 42 62 50 72" stroke={color} strokeWidth={1} />
  </svg>
);

export const VineSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path
      d="M50 10 C55 20 35 25 40 35 C45 45 25 50 30 60 C35 70 15 70 20 75"
      stroke={color}
      strokeWidth={1.5}
    />
    <path d="M45 18 C48 15 52 16 52 19" stroke={color} strokeWidth={0.75} />
    <path d="M35 42 C32 39 28 40 29 43" stroke={color} strokeWidth={0.75} />
    <path d="M25 62 C22 59 18 60 19 63" stroke={color} strokeWidth={0.75} />
  </svg>
);

export const LeafSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path d="M40 10 C55 20 60 40 40 70 C20 40 25 20 40 10 Z" stroke={color} strokeWidth={1.5} />
    <line x1="40" y1="10" x2="40" y2="70" stroke={color} strokeWidth={1} />
    <line x1="40" y1="30" x2="32" y2="36" stroke={color} strokeWidth={0.75} />
    <line x1="40" y1="30" x2="48" y2="36" stroke={color} strokeWidth={0.75} />
    <line x1="40" y1="45" x2="30" y2="50" stroke={color} strokeWidth={0.75} />
    <line x1="40" y1="45" x2="50" y2="50" stroke={color} strokeWidth={0.75} />
  </svg>
);

export const SproutSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <line x1="15" y1="65" x2="65" y2="65" stroke={color} strokeWidth={1.5} />
    <path d="M40 65 C40 50 30 42 25 35" stroke={color} strokeWidth={1.5} />
    <path d="M40 65 C40 50 50 42 55 35" stroke={color} strokeWidth={1.5} />
    <path d="M25 35 C22 28 28 22 32 28" stroke={color} strokeWidth={1} />
    <path d="M55 35 C58 28 52 22 48 28" stroke={color} strokeWidth={1} />
  </svg>
);

export const CocoonSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <ellipse cx="40" cy="40" rx="16" ry="28" stroke={color} strokeWidth={1.5} />
    <line x1="28" y1="28" x2="52" y2="28" stroke={color} strokeWidth={0.75} />
    <line x1="26" y1="36" x2="54" y2="36" stroke={color} strokeWidth={0.75} />
    <line x1="26" y1="44" x2="54" y2="44" stroke={color} strokeWidth={0.75} />
    <line x1="28" y1="52" x2="52" y2="52" stroke={color} strokeWidth={0.75} />
  </svg>
);

export const ArborSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path d="M12 70 L12 35 Q12 12 40 12 Q68 12 68 35 L68 70" stroke={color} strokeWidth={1.5} />
    <line x1="20" y1="28" x2="60" y2="28" stroke={color} strokeWidth={0.75} />
    <line x1="16" y1="38" x2="64" y2="38" stroke={color} strokeWidth={0.75} />
    <line x1="14" y1="48" x2="66" y2="48" stroke={color} strokeWidth={0.75} />
  </svg>
);

export const SeedSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <circle cx="40" cy="42" r="22" stroke={color} strokeWidth={1.5} />
    <path d="M40 22 C42 30 42 42 40 64" stroke={color} strokeWidth={1} />
    <path d="M40 42 C44 38 52 36 56 40" stroke={color} strokeWidth={1} />
  </svg>
);

// Water -- flowing curves, wave patterns, circles/droplets, gentle arcs

export const SpringSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path
      d="M30 70 C30 60 50 55 50 45 C50 35 30 30 30 20 C30 12 38 8 44 10"
      stroke={color}
      strokeWidth={1.5}
    />
    <circle cx="44" cy="10" r="2.5" fill={color} />
  </svg>
);

export const RainSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <line x1="20" y1="15" x2="16" y2="35" stroke={color} strokeWidth={1} />
    <line x1="32" y1="10" x2="28" y2="30" stroke={color} strokeWidth={1} />
    <line x1="44" y1="18" x2="40" y2="38" stroke={color} strokeWidth={1} />
    <line x1="56" y1="12" x2="52" y2="32" stroke={color} strokeWidth={1} />
    <line x1="68" y1="20" x2="64" y2="40" stroke={color} strokeWidth={1} />
    <line x1="26" y1="40" x2="22" y2="60" stroke={color} strokeWidth={1} />
    <line x1="38" y1="45" x2="34" y2="65" stroke={color} strokeWidth={1} />
    <line x1="50" y1="42" x2="46" y2="62" stroke={color} strokeWidth={1} />
    <line x1="62" y1="48" x2="58" y2="68" stroke={color} strokeWidth={1} />
  </svg>
);

export const TideSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path d="M8 30 C18 22 28 22 40 30 C52 38 62 38 72 30" stroke={color} strokeWidth={1.5} />
    <path d="M8 44 C18 36 28 36 40 44 C52 52 62 52 72 44" stroke={color} strokeWidth={1.5} />
    <path d="M8 58 C18 50 28 50 40 58 C52 66 62 66 72 58" stroke={color} strokeWidth={1.5} />
  </svg>
);

export const FogSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <line x1="12" y1="25" x2="55" y2="25" stroke={color} strokeWidth={1.5} />
    <line x1="22" y1="35" x2="68" y2="35" stroke={color} strokeWidth={1.5} />
    <line x1="8" y1="45" x2="50" y2="45" stroke={color} strokeWidth={1.5} />
    <line x1="25" y1="55" x2="72" y2="55" stroke={color} strokeWidth={1.5} />
  </svg>
);

export const WellSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <rect x="20" y="20" width="40" height="40" stroke={color} strokeWidth={1.5} />
    <circle cx="40" cy="40" r="14" stroke={color} strokeWidth={1} />
    <circle cx="40" cy="40" r="7" stroke={color} strokeWidth={0.75} />
    <circle cx="40" cy="40" r="2" fill={color} />
  </svg>
);

export const IceSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path d="M40 8 L55 25 L55 50 L40 68 L25 50 L25 25 Z" stroke={color} strokeWidth={1.5} />
    <line x1="40" y1="8" x2="40" y2="68" stroke={color} strokeWidth={0.75} />
    <line x1="25" y1="25" x2="55" y2="50" stroke={color} strokeWidth={0.75} />
    <line x1="55" y1="25" x2="25" y2="50" stroke={color} strokeWidth={0.75} />
  </svg>
);

export const AbyssSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path
      d="M55 12 C55 25 25 25 25 38 C25 51 55 51 55 64 C55 72 45 75 40 68"
      stroke={color}
      strokeWidth={1.5}
    />
    <circle cx="40" cy="68" r="3" fill={color} />
  </svg>
);

export const DewSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <circle cx="40" cy="38" r="18" stroke={color} strokeWidth={1.5} />
    <path d="M32 32 C34 28 38 30 36 34" stroke={color} strokeWidth={1} />
    <line x1="25" y1="65" x2="55" y2="65" stroke={color} strokeWidth={1.5} />
  </svg>
);

export const StreamSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path d="M10 25 C20 15 30 35 40 25 C50 15 60 35 70 25" stroke={color} strokeWidth={1.5} />
    <path d="M10 42 C20 32 30 52 40 42 C50 32 60 52 70 42" stroke={color} strokeWidth={1.5} />
    <path d="M10 59 C20 49 30 69 40 59 C50 49 60 69 70 59" stroke={color} strokeWidth={1.5} />
  </svg>
);

export const TearSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path
      d="M40 10 C52 28 58 42 58 50 C58 62 50 70 40 70 C30 70 22 62 22 50 C22 42 28 28 40 10 Z"
      stroke={color}
      strokeWidth={1.5}
    />
    <path d="M35 45 C36 40 40 38 42 42" stroke={color} strokeWidth={1} />
  </svg>
);

// Fire -- radiating lines, sharp points, angular burst patterns, ascending forms

export const FlameSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path
      d="M40 8 C48 20 58 30 58 48 C58 60 50 70 40 70 C30 70 22 60 22 48 C22 30 32 20 40 8 Z"
      stroke={color}
      strokeWidth={1.5}
    />
    <path
      d="M40 35 C44 42 48 48 48 55 C48 62 44 65 40 65 C36 65 32 62 32 55 C32 48 36 42 40 35 Z"
      stroke={color}
      strokeWidth={1}
    />
  </svg>
);

export const GlareSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <circle cx="40" cy="40" r="6" fill={color} />
    <line x1="40" y1="8" x2="40" y2="22" stroke={color} strokeWidth={1.5} />
    <line x1="40" y1="58" x2="40" y2="72" stroke={color} strokeWidth={1.5} />
    <line x1="8" y1="40" x2="22" y2="40" stroke={color} strokeWidth={1.5} />
    <line x1="58" y1="40" x2="72" y2="40" stroke={color} strokeWidth={1.5} />
    <line x1="17" y1="17" x2="27" y2="27" stroke={color} strokeWidth={1.5} />
    <line x1="53" y1="53" x2="63" y2="63" stroke={color} strokeWidth={1.5} />
    <line x1="63" y1="17" x2="53" y2="27" stroke={color} strokeWidth={1.5} />
    <line x1="27" y1="53" x2="17" y2="63" stroke={color} strokeWidth={1.5} />
  </svg>
);

export const TorchSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <line x1="40" y1="45" x2="40" y2="72" stroke={color} strokeWidth={1.5} />
    <line x1="34" y1="45" x2="46" y2="45" stroke={color} strokeWidth={1.5} />
    <path
      d="M34 45 C34 35 30 28 34 20 C37 14 40 8 40 8 C40 8 43 14 46 20 C50 28 46 35 46 45"
      stroke={color}
      strokeWidth={1.5}
    />
  </svg>
);

export const AshSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <circle cx="25" cy="18" r="3" fill={color} />
    <circle cx="45" cy="14" r="2" fill={color} />
    <circle cx="60" cy="22" r="2.5" fill={color} />
    <circle cx="18" cy="35" r="2" fill={color} />
    <circle cx="38" cy="32" r="3" fill={color} />
    <circle cx="55" cy="40" r="2" fill={color} />
    <circle cx="30" cy="50" r="2.5" fill={color} />
    <circle cx="50" cy="55" r="2" fill={color} />
    <circle cx="40" cy="65" r="3" fill={color} />
    <circle cx="62" cy="60" r="1.5" fill={color} />
    <line x1="15" y1="72" x2="65" y2="72" stroke={color} strokeWidth={0.75} />
  </svg>
);

export const CandleSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <rect x="33" y="32" width="14" height="38" stroke={color} strokeWidth={1.5} />
    <path
      d="M40 32 C40 32 36 24 36 18 C36 12 38 8 40 8 C42 8 44 12 44 18 C44 24 40 32 40 32 Z"
      stroke={color}
      strokeWidth={1.5}
    />
    <circle cx="40" cy="16" r="2" fill={color} />
    <line x1="30" y1="70" x2="50" y2="70" stroke={color} strokeWidth={1} />
  </svg>
);

export const BeaconSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path d="M25 70 L40 20 L55 70 Z" stroke={color} strokeWidth={1.5} />
    <line x1="40" y1="20" x2="40" y2="8" stroke={color} strokeWidth={1.5} />
    <line x1="40" y1="20" x2="28" y2="10" stroke={color} strokeWidth={1} />
    <line x1="40" y1="20" x2="52" y2="10" stroke={color} strokeWidth={1} />
    <line x1="40" y1="20" x2="22" y2="18" stroke={color} strokeWidth={1} />
    <line x1="40" y1="20" x2="58" y2="18" stroke={color} strokeWidth={1} />
  </svg>
);

export const MeltSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path
      d="M22 18 C22 18 28 22 35 18 C42 14 45 20 50 18 C55 16 58 20 58 18"
      stroke={color}
      strokeWidth={1.5}
    />
    <path d="M20 32 C22 28 30 34 38 30 C46 26 50 32 58 28" stroke={color} strokeWidth={1.5} />
    <path d="M18 46 C22 42 32 48 42 44 C52 40 56 46 62 42" stroke={color} strokeWidth={1.5} />
    <path d="M22 60 C26 56 34 62 44 58 C54 54 58 60 60 58" stroke={color} strokeWidth={1.5} />
    <path d="M28 68 C30 72 34 68 36 72" stroke={color} strokeWidth={1} />
    <path d="M48 66 C50 70 54 66 56 70" stroke={color} strokeWidth={1} />
  </svg>
);

export const EmberSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path d="M40 15 L55 40 L40 65 L25 40 Z" stroke={color} strokeWidth={1.5} />
    <line x1="40" y1="15" x2="40" y2="5" stroke={color} strokeWidth={1} />
    <line x1="55" y1="40" x2="65" y2="40" stroke={color} strokeWidth={1} />
    <line x1="40" y1="65" x2="40" y2="75" stroke={color} strokeWidth={1} />
    <line x1="25" y1="40" x2="15" y2="40" stroke={color} strokeWidth={1} />
    <circle cx="40" cy="40" r="3" fill={color} />
  </svg>
);

export const StarSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path
      d="M40 8 L44 32 L68 32 L48 46 L56 70 L40 54 L24 70 L32 46 L12 32 L36 32 Z"
      stroke={color}
      strokeWidth={1.5}
    />
    <circle cx="40" cy="40" r="4" fill={color} />
  </svg>
);

export const BurnSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path
      d="M20 70 L28 55 L36 60 L40 45 L44 58 L52 50 L60 65 L65 55"
      stroke={color}
      strokeWidth={1.5}
    />
    <path d="M25 70 L32 60 L38 64 L42 52 L48 62 L55 56" stroke={color} strokeWidth={1} />
    <circle cx="40" cy="42" r="2" fill={color} />
    <circle cx="28" cy="54" r="1.5" fill={color} />
    <circle cx="52" cy="49" r="1.5" fill={color} />
  </svg>
);

// Earth -- horizontal layers, stacked shapes, grounded rectangles, compressed forms

export const DustSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <circle cx="25" cy="25" r="2" fill={color} />
    <circle cx="40" cy="20" r="1.5" fill={color} />
    <circle cx="55" cy="28" r="2" fill={color} />
    <circle cx="18" cy="40" r="1.5" fill={color} />
    <circle cx="35" cy="38" r="2" fill={color} />
    <circle cx="50" cy="42" r="1.5" fill={color} />
    <circle cx="65" cy="36" r="2" fill={color} />
    <circle cx="22" cy="55" r="2" fill={color} />
    <circle cx="42" cy="52" r="1.5" fill={color} />
    <circle cx="58" cy="58" r="2" fill={color} />
    <circle cx="32" cy="65" r="1.5" fill={color} />
    <circle cx="48" cy="68" r="2" fill={color} />
    <circle cx="62" cy="52" r="1.5" fill={color} />
  </svg>
);

export const RockSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path
      d="M20 55 L15 40 L22 28 L35 18 L50 20 L62 28 L65 42 L58 55 Z"
      stroke={color}
      strokeWidth={1.5}
    />
    <line x1="35" y1="18" x2="32" y2="55" stroke={color} strokeWidth={0.75} />
    <line x1="50" y1="20" x2="48" y2="55" stroke={color} strokeWidth={0.75} />
    <line x1="15" y1="40" x2="65" y2="40" stroke={color} strokeWidth={0.75} />
  </svg>
);

export const SandSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path d="M8 25 C18 20 28 28 40 22 C52 16 62 24 72 20" stroke={color} strokeWidth={1.5} />
    <path d="M8 38 C18 33 28 41 40 35 C52 29 62 37 72 33" stroke={color} strokeWidth={1.5} />
    <path d="M8 51 C18 46 28 54 40 48 C52 42 62 50 72 46" stroke={color} strokeWidth={1.5} />
    <path d="M8 64 C18 59 28 67 40 61 C52 55 62 63 72 59" stroke={color} strokeWidth={1.5} />
  </svg>
);

export const SoilSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <line x1="15" y1="20" x2="65" y2="20" stroke={color} strokeWidth={1.5} />
    <circle cx="28" cy="30" r="3" fill={color} />
    <circle cx="52" cy="32" r="2.5" fill={color} />
    <line x1="15" y1="40" x2="65" y2="40" stroke={color} strokeWidth={1.5} />
    <circle cx="35" cy="50" r="2" fill={color} />
    <circle cx="55" cy="48" r="3" fill={color} />
    <circle cx="22" cy="52" r="2.5" fill={color} />
    <line x1="15" y1="60" x2="65" y2="60" stroke={color} strokeWidth={1.5} />
  </svg>
);

export const ValleySymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <line x1="8" y1="18" x2="72" y2="18" stroke={color} strokeWidth={1} />
    <path d="M8 18 L35 65 L40 70 L45 65 L72 18" stroke={color} strokeWidth={1.5} />
    <line x1="22" y1="18" x2="35" y2="42" stroke={color} strokeWidth={0.75} />
    <line x1="58" y1="18" x2="45" y2="42" stroke={color} strokeWidth={0.75} />
  </svg>
);

export const WallSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <rect x="12" y="15" width="22" height="16" stroke={color} strokeWidth={1.5} />
    <rect x="38" y="15" width="22" height="16" stroke={color} strokeWidth={1.5} />
    <rect x="25" y="35" width="22" height="16" stroke={color} strokeWidth={1.5} />
    <rect x="12" y="55" width="22" height="16" stroke={color} strokeWidth={1.5} />
    <rect x="38" y="55" width="22" height="16" stroke={color} strokeWidth={1.5} />
    <rect x="52" y="35" width="18" height="16" stroke={color} strokeWidth={1.5} />
  </svg>
);

export const TraceSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path
      d="M12 40 C20 30 28 35 36 28 C44 21 50 32 58 25 C62 22 66 28 70 24"
      stroke={color}
      strokeWidth={1.5}
      strokeDasharray="4 4"
    />
    <circle cx="12" cy="40" r="2.5" fill={color} />
    <circle cx="70" cy="24" r="2.5" fill={color} />
  </svg>
);

export const PathSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path
      d="M10 70 C18 60 22 45 30 40 C38 35 42 50 50 42 C58 34 62 25 70 15"
      stroke={color}
      strokeWidth={1.5}
    />
    <circle cx="10" cy="70" r="2" fill={color} />
    <circle cx="70" cy="15" r="2" fill={color} />
  </svg>
);

export const StairsSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path
      d="M15 70 L15 58 L27 58 L27 46 L39 46 L39 34 L51 34 L51 22 L63 22 L63 12"
      stroke={color}
      strokeWidth={1.5}
    />
    <line x1="15" y1="70" x2="27" y2="70" stroke={color} strokeWidth={1} />
    <line x1="27" y1="58" x2="39" y2="58" stroke={color} strokeWidth={1} />
    <line x1="39" y1="46" x2="51" y2="46" stroke={color} strokeWidth={1} />
    <line x1="51" y1="34" x2="63" y2="34" stroke={color} strokeWidth={1} />
  </svg>
);

export const MoundSymbol: FC<SymbolSVGProps> = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path d="M8 60 C18 35 30 22 40 18 C50 22 62 35 72 60" stroke={color} strokeWidth={1.5} />
    <line x1="5" y1="60" x2="75" y2="60" stroke={color} strokeWidth={1.5} />
    <line x1="40" y1="18" x2="40" y2="8" stroke={color} strokeWidth={1} />
    <circle cx="40" cy="8" r="2" fill={color} />
  </svg>
);

export const SYMBOL_SVG_MAP: Record<string, FC<SymbolSVGProps>> = {
  mirror: MirrorSymbol,
  blade: BladeSymbol,
  bell: BellSymbol,
  lock: LockSymbol,
  needle: NeedleSymbol,
  crown: CrownSymbol,
  chain: ChainSymbol,
  coin: CoinSymbol,
  stele: SteleSymbol,
  dagger: DaggerSymbol,
  tree: TreeSymbol,
  forest: ForestSymbol,
  branch: BranchSymbol,
  root: RootSymbol,
  vine: VineSymbol,
  leaf: LeafSymbol,
  sprout: SproutSymbol,
  cocoon: CocoonSymbol,
  arbor: ArborSymbol,
  seed: SeedSymbol,
  spring: SpringSymbol,
  rain: RainSymbol,
  tide: TideSymbol,
  fog: FogSymbol,
  well: WellSymbol,
  ice: IceSymbol,
  abyss: AbyssSymbol,
  dew: DewSymbol,
  stream: StreamSymbol,
  tear: TearSymbol,
  flame: FlameSymbol,
  glare: GlareSymbol,
  torch: TorchSymbol,
  ash: AshSymbol,
  candle: CandleSymbol,
  beacon: BeaconSymbol,
  melt: MeltSymbol,
  ember: EmberSymbol,
  star: StarSymbol,
  burn: BurnSymbol,
  dust: DustSymbol,
  rock: RockSymbol,
  sand: SandSymbol,
  soil: SoilSymbol,
  valley: ValleySymbol,
  wall: WallSymbol,
  trace: TraceSymbol,
  path: PathSymbol,
  stairs: StairsSymbol,
  mound: MoundSymbol,
};
