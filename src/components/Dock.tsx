import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';
import { useI18n } from '../i18n';
import { Device, Download, Home, Mail, Plan } from './Icons';

/**
 * Floating dock that appears once the visitor scrolls past the first screen:
 * the main pages, the CV and contact, one icon each. A single label glides
 * above whichever icon is hovered or focused.
 */
export function Dock() {
  const { t, c } = useI18n();
  const [shown, setShown] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [x, setX] = useState(0);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (active === null || !listRef.current) return;
    const item = listRef.current.children[active] as HTMLElement | undefined;
    if (item) setX(item.offsetLeft + item.offsetWidth / 2);
  }, [active]);

  const items = [
    { to: '/', label: t.nav.home, icon: <Home size={19} /> },
    { to: '/architecture', label: t.nav.architecture, icon: <Plan size={19} /> },
    { to: '/technology', label: t.nav.technology, icon: <Device size={19} /> },
    { href: c.profile.cv, label: t.home.downloadCv, icon: <Download size={19} /> },
    { to: '/contact', label: t.nav.contact, icon: <Mail size={19} /> },
  ];

  return (
    <nav className={`dock${shown ? ' is-shown' : ''}`} aria-label={t.nav.dock} onMouseLeave={() => setActive(null)}>
      <span className={`dock__tip${active !== null ? ' is-on' : ''}`} style={{ '--x': `${x}px` } as CSSProperties} aria-hidden>
        {active !== null && items[active].label}
      </span>
      <ul ref={listRef}>
        {items.map((item, i) => (
          <li key={item.label} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onBlur={() => setActive(null)}>
            {item.to ? (
              <NavLink to={item.to} end={item.to === '/'} className="dock__link" aria-label={item.label} tabIndex={shown ? 0 : -1}>
                {item.icon}
              </NavLink>
            ) : (
              <a href={item.href} download="Nicole-Gofman-CV.pdf" className="dock__link" aria-label={`${item.label} (PDF)`} tabIndex={shown ? 0 : -1}>
                {item.icon}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
