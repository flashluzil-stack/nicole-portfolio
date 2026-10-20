import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navigation } from '../content/site';
import { profile } from '../content/profile';
import { Close, LinkedIn } from './Icons';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu: lock scroll, close on Escape, keep focus inside.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const first = menuRef.current?.querySelector<HTMLElement>('a, button');
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === 'Tab' && menuRef.current) {
        const items = [toggleRef.current, ...menuRef.current.querySelectorAll<HTMLElement>('a, button')].filter(
          Boolean,
        ) as HTMLElement[];
        const i = items.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) {
          e.preventDefault();
          items[items.length - 1].focus();
        } else if (!e.shiftKey && i === items.length - 1) {
          e.preventDefault();
          items[0].focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="site-header__inner">
        <Link to="/" className="brand" aria-label={`${profile.name} — home`}>
          <span className="brand__name">Nicole Gofman</span>
          <span className="brand__role">Architecture &amp; Technology</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          <ul>
            {navigation.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className="site-nav__link">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
          {open ? (
            <Close size={22} />
          ) : (
            <span className="menu-toggle__bars" aria-hidden>
              <span />
              <span />
            </span>
          )}
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        className="mobile-menu"
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <nav aria-label="Mobile">
          <ul>
            {navigation.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className="mobile-menu__link">
                  <span className="mobile-menu__index">{item.index}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu__foot">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedIn size={16} /> LinkedIn
          </a>
        </div>
      </div>
    </header>
  );
}
