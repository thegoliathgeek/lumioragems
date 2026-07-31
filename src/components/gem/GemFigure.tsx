import { gemRamp } from "@/lib/design/tokens";
import type { GemHue } from "@/types";
import { cn } from "@/lib/utils";

const CUTS = {
  cushion: "M0,-40 L28,-28 L40,0 L28,28 L0,40 L-28,28 L-40,0 L-28,-28 Z",
  round: "M0,-40 L28,-28 L40,0 L28,28 L0,40 L-28,28 L-40,0 L-28,-28 Z",
  oval: "M0,-44 L24,-30 L32,0 L24,30 L0,44 L-24,30 L-32,0 L-24,-30 Z",
  emerald: "M-26,-40 L26,-40 L34,-32 L34,32 L26,40 L-26,40 L-34,32 L-34,-32 Z",
  pear: "M0,-44 L26,-14 L22,30 L0,44 L-22,30 L-26,-14 Z",
  kite: "M0,-44 L30,-6 L0,44 L-30,-6 Z",
  hexagon: "M0,-40 L34,-20 L34,20 L0,40 L-34,20 L-34,-20 Z",
  radiant: "M-24,-38 L24,-38 L36,-26 L36,26 L24,38 L-24,38 L-36,26 L-36,-26 Z",
} as const;

type CutKey = keyof typeof CUTS;

function cutFor(shape?: string): CutKey {
  const key = shape?.toLowerCase() as CutKey | undefined;
  return key && key in CUTS ? key : "cushion";
}

/**
 * Renders a faceted gem as inline SVG.
 *
 * Every listing needs a visual, but Phase 1 launches before the photography
 * is shot. This draws the stone from its own data — hue and cut — so the
 * catalogue looks complete, loads instantly, and needs no image budget.
 * Once real photography exists, `ProductImage` prefers it automatically.
 */
export function GemFigure({
  hue,
  shape,
  size = 120,
  className,
}: {
  hue: GemHue;
  shape?: string;
  size?: number;
  className?: string;
}) {
  const ramp = gemRamp(hue);
  const cut = cutFor(shape);
  const path = CUTS[cut];
  const uid = `${hue}-${cut}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="-50 -50 100 100"
      className={cn("overflow-visible", className)}
      role="img"
      aria-label={`${shape ?? "Faceted"} ${hue} gemstone`}
    >
      <defs>
        <radialGradient id={`crown-${uid}`} cx="38%" cy="30%" r="70%">
          <stop offset="0%" stopColor={ramp.light} />
          <stop offset="52%" stopColor={ramp.mid} />
          <stop offset="100%" stopColor={ramp.deep} />
        </radialGradient>
        <linearGradient id={`sheen-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* body */}
      <path d={path} fill={`url(#crown-${uid})`} stroke="#b08f5e" strokeWidth="0.6" strokeOpacity="0.5" />
      {/* table facet */}
      <path d={path} transform="scale(0.52)" fill={ramp.light} fillOpacity="0.32" stroke="#ffffff" strokeOpacity="0.28" strokeWidth="0.7" />
      {/* pavilion shading */}
      <path d={path} transform="scale(0.52)" fill="none" />
      <path d="M0,-21 L0,21 M-21,0 L21,0" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="0.5" />
      {/* crown sparkle */}
      <ellipse cx="-13" cy="-17" rx="8" ry="12" fill={`url(#sheen-${uid})`} transform="rotate(-28 -13 -17)" />
    </svg>
  );
}
