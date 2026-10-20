import type { SVGProps } from 'react';

// Directional icons carry the `icon-dir` class, which mirrors them in
// right-to-left layouts (see base.css). Logos and symmetric icons never flip.

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size = 18): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
});

export const ArrowRight = ({ size, className = '', ...p }: IconProps) => (
  <svg {...base(size)} {...p} className={`icon-dir ${className}`}>
    <path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5" />
  </svg>
);

export const ArrowLeft = ({ size, className = '', ...p }: IconProps) => (
  <svg {...base(size)} {...p} className={`icon-dir ${className}`}>
    <path d="M20 12H5M10.5 6.5 5 12l5.5 5.5" />
  </svg>
);

export const ArrowUpRight = ({ size, className = '', ...p }: IconProps) => (
  <svg {...base(size)} {...p} className={`icon-dir ${className}`}>
    <path d="M7 17 17 7M8.5 7H17v8.5" />
  </svg>
);

export const Close = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />
  </svg>
);

export const Mail = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="0.5" />
    <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
  </svg>
);

export const Copy = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <rect x="8.5" y="8.5" width="11" height="11" />
    <path d="M15.5 8.5V4.5h-11v11h4" />
  </svg>
);

export const Download = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 4v11M7 10.5l5 5 5-5M5 20h14" />
  </svg>
);

/** LinkedIn mark (filled). */
export const LinkedIn = ({ size = 18, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable={false} {...p}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);
