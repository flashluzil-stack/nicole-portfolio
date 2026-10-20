/**
 * Decorative linework in the language of an architectural drawing —
 * structural grid, walls, openings, dimension strings and a section mark.
 * It is an abstract graphic, not one of Nicole's projects, and is hidden
 * from assistive technology.
 */
export function ArchDrawing({ className = '' }: { className?: string }) {
  const axesX = [80, 230, 380, 520];
  const axesY = [90, 250, 410, 530];
  return (
    <svg className={`arch-drawing ${className}`} viewBox="0 0 600 620" aria-hidden focusable="false">
      <g className="arch-drawing__grid">
        {axesX.map((x, i) => (
          <g key={`x${x}`}>
            <line x1={x} y1={40} x2={x} y2={580} />
            <circle cx={x} cy={24} r={12} />
            <text x={x} y={28}>{String.fromCharCode(65 + i)}</text>
          </g>
        ))}
        {axesY.map((y, i) => (
          <g key={`y${y}`}>
            <line x1={40} y1={y} x2={560} y2={y} />
            <circle cx={22} cy={y} r={12} />
            <text x={22} y={y + 4}>{i + 1}</text>
          </g>
        ))}
      </g>

      <g className="arch-drawing__walls">
        <path d="M80 90 H520 V530 H80 Z" />
        <path d="M230 90 V200 M230 260 V410 H380 M380 330 V530 M80 250 H170 M210 250 H230" />
        <path d="M380 90 V170" />
      </g>

      <g className="arch-drawing__openings">
        <path d="M170 250 A40 40 0 0 1 210 210" />
        <path d="M230 200 A60 60 0 0 1 290 260" />
        <path d="M380 270 A60 60 0 0 0 320 330" />
        <line x1="440" y1="90" x2="500" y2="90" className="glazing" />
        <line x1="80" y1="320" x2="80" y2="390" className="glazing" />
        <line x1="440" y1="530" x2="500" y2="530" className="glazing" />
      </g>

      <g className="arch-drawing__hatch">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={400 + i * 14} y1={350} x2={400 + i * 14 - 20} y2={370} />
        ))}
      </g>

      <g className="arch-drawing__stair">
        {Array.from({ length: 8 }, (_, i) => (
          <line key={i} x1={250} y1={290 + i * 14} x2={360} y2={290 + i * 14} />
        ))}
        <path d="M305 395 V292 M298 300 L305 290 L312 300" />
      </g>

      <g className="arch-drawing__dims">
        <line x1="80" y1="570" x2="520" y2="570" />
        {[80, 230, 380, 520].map((x) => (
          <line key={x} x1={x - 5} y1={575} x2={x + 5} y2={565} />
        ))}
        <text x="155" y="562">4.50</text>
        <text x="305" y="562">4.50</text>
        <text x="450" y="562">4.20</text>
      </g>

      <g className="arch-drawing__section">
        <line x1="40" y1="470" x2="560" y2="470" strokeDasharray="14 6 3 6" />
        <path d="M40 470 l0 -18 l16 18 z M560 470 l0 -18 l-16 18 z" />
        <text x="48" y="494">A</text>
        <text x="546" y="494">A</text>
      </g>
    </svg>
  );
}
