import type { ReactNode } from 'react';

interface SectionHeadingProps {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  id?: string;
  children?: ReactNode;
  as?: 'h1' | 'h2';
}

/** Numbered editorial section heading: "01 — Eyebrow" over a display title. */
export function SectionHeading({ index, eyebrow, title, id, children, as: Tag = 'h2' }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <p className="eyebrow">
        {index && <span className="eyebrow__index">{index}</span>}
        {eyebrow}
      </p>
      <Tag id={id} className="section-heading__title">
        {title}
      </Tag>
      {children && <div className="section-heading__aside">{children}</div>}
    </header>
  );
}
