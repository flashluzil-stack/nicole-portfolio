import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from './Icons';
import { useI18n } from '../i18n';

interface CtaProps {
  to: string;
  children: ReactNode;
  variant?: 'solid' | 'line' | 'text';
  external?: boolean;
  className?: string;
}

/** Call-to-action link. External links open in a new tab, safely. */
export function Cta({ to, children, variant = 'line', external, className = '' }: CtaProps) {
  const { t } = useI18n();
  const cls = `cta cta--${variant} ${className}`;
  if (external) {
    return (
      <a className={cls} href={to} target="_blank" rel="noopener noreferrer">
        <span>{children}</span>
        <ArrowUpRight size={16} />
        <span className="visually-hidden">{t.common.newTab}</span>
      </a>
    );
  }
  return (
    <Link className={cls} to={to}>
      <span>{children}</span>
      <ArrowRight size={16} />
    </Link>
  );
}
