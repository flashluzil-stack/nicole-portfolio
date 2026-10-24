import { Suspense, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Intro } from './Intro';
import { Dock } from './Dock';
import { useI18n } from '../i18n';
import { useReveal, useScrollProgress } from '../hooks/useReveal';

export function Layout() {
  const { pathname, hash } = useLocation();
  const { t } = useI18n();
  const mainRef = useRef<HTMLElement>(null);
  const first = useRef(true);
  const progressRef = useRef<HTMLDivElement>(null);
  useReveal(pathname);
  useScrollProgress(progressRef);

  // On navigation: jump to the anchor if there is one (waiting briefly for a
  // lazily loaded page to render it), otherwise to the top, and move focus to
  // the main region so screen readers announce the new page.
  useEffect(() => {
    let frame = 0;
    let cleanup = () => {};
    if (hash) {
      first.current = false;
      const id = decodeURIComponent(hash.slice(1));
      let tries = 0;
      const seek = () => {
        const el = document.getElementById(id);
        if (el) {
          // Jump instantly: a smooth scroll across a freshly loaded page can
          // land off-target while lazy content settles.
          const jump = () => el.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
          jump();
          // Late layout changes (web fonts swapping in, images decoding) can
          // push the target away. Keep it in place for a moment, unless the
          // visitor starts scrolling.
          const settle = new ResizeObserver(jump);
          settle.observe(document.body);
          const stop = () => {
            settle.disconnect();
            window.removeEventListener('wheel', stop);
            window.removeEventListener('touchstart', stop);
            window.removeEventListener('keydown', stop);
          };
          window.addEventListener('wheel', stop, { passive: true });
          window.addEventListener('touchstart', stop, { passive: true });
          window.addEventListener('keydown', stop);
          cleanup = stop;
          window.setTimeout(stop, 1500);
        } else if (tries++ < 60) frame = requestAnimationFrame(seek);
      };
      seek();
      return () => {
        cancelAnimationFrame(frame);
        cleanup();
      };
    }
    window.scrollTo(0, 0);
    if (first.current) {
      first.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname, hash]);

  return (
    <>
      <Intro />
      <a className="skip-link" href="#main">
        {t.nav.skip}
      </a>
      <Header />
      <div className="scroll-progress" ref={progressRef} aria-hidden />
      {/* A drafting line sweeps across the page on every navigation. */}
      <div className="route-sweep" key={`sweep-${pathname}`} aria-hidden />
      <main id="main" ref={mainRef} tabIndex={-1} className="page-enter" key={pathname}>
        <Suspense fallback={<div className="route-loading" role="status" aria-label={t.common.loading} />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <Dock />
    </>
  );
}
