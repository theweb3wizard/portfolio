/**
 * ProjectArt — deterministic generative cover per project slug.
 * Brand-locked palette only (gold / blue / green on dark), pure SVG,
 * aria-hidden so SEO + screen readers keep reading the real card copy.
 */

const GOLD = "#d7a84b";
const BLUE = "#78a9ff";
const GREEN = "#69c98b";

function Rings({ cx, cy, color }: { cx: number; cy: number; color: string }) {
  return (
    <g fill="none" stroke={color} opacity="0.55">
      <circle cx={cx} cy={cy} r="26" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r="48" strokeWidth="1" opacity="0.6" />
      <circle cx={cx} cy={cy} r="74" strokeWidth="1" opacity="0.35" />
      <circle cx={cx} cy={cy} r="102" strokeWidth="1" opacity="0.2" />
    </g>
  );
}

function Grid({ color }: { color: string }) {
  const cells = [];
  for (let x = 0; x < 12; x++) {
    for (let y = 0; y < 5; y++) {
      const on = (x * 7 + y * 13) % 5 === 0;
      cells.push(
        <rect
          key={`${x}-${y}`}
          x={248 + x * 13}
          y={18 + y * 13}
          width="7"
          height="7"
          rx="1.5"
          fill={color}
          opacity={on ? 0.75 : 0.14}
        />
      );
    }
  }
  return <g>{cells}</g>;
}

function Bars({ color }: { color: string }) {
  const heights = [34, 58, 44, 78, 62, 92, 54, 84, 66, 100, 72];
  return (
    <g fill={color}>
      {heights.map((h, i) => (
        <rect key={i} x={238 + i * 15} y={196 - h} width="8" rx="2.5" height={h} opacity={0.28 + (i % 4) * 0.16} />
      ))}
    </g>
  );
}

function Nodes({ color }: { color: string }) {
  const pts: Array<[number, number]> = [[70, 150], [130, 110], [190, 140], [250, 96], [310, 130]];
  return (
    <g stroke={color} fill={color}>
      <polyline points={pts.map((p) => p.join(",")).join(" ")} fill="none" strokeWidth="1.4" opacity="0.6" />
      {pts.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i === 3 ? 6 : 4} opacity="0.9" />
          <circle cx={x} cy={y} r="11" fill="none" opacity="0.35" />
        </g>
      ))}
    </g>
  );
}

export default function ProjectArt({ slug }: { slug: string }) {
  return (
    <svg className="project-art" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      {slug === "valor" && (
        <g>
          <Rings cx={320} cy={60} color={GOLD} />
          <circle cx={80} cy={160} r="5" fill={GOLD} />
          <circle cx={108} cy={160} r="5" fill={GOLD} opacity="0.55" />
          <circle cx={136} cy={160} r="5" fill={GOLD} opacity="0.3" />
          <rect x={52} y={182} width="150" height="7" rx="3.5" fill={GOLD} opacity="0.7" />
          <rect x={52} y={194} width="96" height="7" rx="3.5" fill={BLUE} opacity="0.55" />
        </g>
      )}
      {slug === "walletlens" && (
        <g>
          <Grid color={BLUE} />
          <circle cx={90} cy={120} r="44" fill="none" stroke={BLUE} strokeWidth="1.4" opacity="0.7" />
          <circle cx={90} cy={120} r="6" fill={BLUE} />
          <line x1={90} y1={120} x2={248} y2={60} stroke={BLUE} strokeWidth="1.2" opacity="0.5" />
          <line x1={90} y1={120} x2={248} y2={140} stroke={BLUE} strokeWidth="1.2" opacity="0.35" />
        </g>
      )}
      {slug === "write3" && (
        <g fill={GOLD}>
          {[0, 1, 2, 3].map((r) => (
            <g key={r} opacity={0.75 - r * 0.15}>
              <rect x={250} y={34 + r * 26} width={120 - r * 18} height="9" rx="4.5" />
            </g>
          ))}
          <rect x={48} y={60} width="120" height="86" rx="10" fill="none" stroke={BLUE} strokeWidth="1.4" opacity="0.7" />
          <rect x={62} y={80} width="92" height="9" rx="4.5" fill={BLUE} opacity="0.7" />
          <rect x={62} y={96} width="66" height="9" rx="4.5" fill={BLUE} opacity="0.45" />
          <rect x={62} y={112} width="78" height="9" rx="4.5" fill={BLUE} opacity="0.3" />
        </g>
      )}
      {slug === "agenthub" && (
        <g>
          <rect x={236} y={36} width="120" height="120" rx="18" fill="none" stroke={GOLD} strokeWidth="1.6" opacity="0.7" />
          <rect x={262} y={62} width="68" height="68" rx="12" fill="none" stroke={GOLD} strokeWidth="1.2" opacity="0.45" />
          <circle cx={296} cy={96} r="7" fill={GOLD} />
          <circle cx={90} cy={150} r="4" fill={GREEN} />
          <circle cx={120} cy={150} r="4" fill={GREEN} opacity="0.6" />
          <circle cx={150} cy={150} r="4" fill={GREEN} opacity="0.35" />
        </g>
      )}
      {slug === "orderflow" && (
        <g>
          <Bars color={GREEN} />
          <polyline points="40,150 100,128 160,138 220,100 280,110 340,74" fill="none" stroke={GOLD} strokeWidth="2" opacity="0.85" />
          <circle cx={340} cy={74} r="5" fill={GOLD} />
        </g>
      )}
      {slug === "solpulse" && (
        <g>
          <Rings cx={200} cy={110} color={BLUE} />
          <circle cx={200} cy={110} r="6" fill={GOLD} />
          <line x1={200} y1={110} x2={268} y2={58} stroke={GOLD} strokeWidth="1.6" />
          <circle cx={268} cy={58} r="4" fill={GOLD} />
        </g>
      )}
      {!["valor", "walletlens", "write3", "agenthub", "orderflow", "solpulse"].includes(slug) && (
        <g>
          <Nodes color={GOLD} />
          <Grid color={BLUE} />
        </g>
      )}
      <rect x="0" y="0" width="400" height="220" fill="black" opacity="0" />
    </svg>
  );
}
