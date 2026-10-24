import { useEffect, useLayoutEffect, useState } from 'react';

const SEEN_KEY = 'ng-intro';
const HOLD = 2600;
const EXIT = 900;

function shouldPlay() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return window.sessionStorage.getItem(SEEN_KEY) !== '1';
  } catch {
    return true;
  }
}

/**
 * Opening screen, once per visit: the Nicole Gofman wordmark with the name
 * travelling around it in a ring and a small sphere orbiting with a soft
 * trail. It lifts away after a moment, or at once on a click or key press.
 * Scroll reveals wait for it (html.intro-on, then an `intro:done` event).
 * Skipped entirely with reduced motion. Decorative, so hidden from
 * assistive technology.
 */
export function Intro() {
  const [phase, setPhase] = useState<'off' | 'on' | 'exit'>(() => (shouldPlay() ? 'on' : 'off'));

  useLayoutEffect(() => {
    if (phase !== 'on') return;
    document.documentElement.classList.add('intro-on');
  }, [phase]);

  useEffect(() => {
    if (phase === 'off') return;
    if (phase === 'on') {
      try {
        window.sessionStorage.setItem(SEEN_KEY, '1');
      } catch {
        /* storage unavailable: the intro may play again next time */
      }
      const skip = () => setPhase('exit');
      const id = window.setTimeout(skip, HOLD);
      window.addEventListener('keydown', skip);
      window.addEventListener('pointerdown', skip);
      window.addEventListener('wheel', skip, { passive: true });
      return () => {
        window.clearTimeout(id);
        window.removeEventListener('keydown', skip);
        window.removeEventListener('pointerdown', skip);
        window.removeEventListener('wheel', skip);
      };
    }
    // Exit: let the page reveal itself as the curtain lifts.
    document.documentElement.classList.remove('intro-on');
    window.dispatchEvent(new Event('intro:done'));
    const id = window.setTimeout(() => setPhase('off'), EXIT);
    return () => window.clearTimeout(id);
  }, [phase]);

  if (phase === 'off') return null;

  const ring = 'NICOLE GOFMAN · ARCHITECTURE & TECHNOLOGY · ';

  return (
    <div className={`intro${phase === 'exit' ? ' is-leaving' : ''}`} aria-hidden lang="en" dir="ltr">
      <div className="intro__stage">
        <svg className="intro__ring" viewBox="0 0 300 300" focusable="false">
          <defs>
            <path id="intro-circle" d="M150 150 m-122 0 a122 122 0 1 1 244 0 a122 122 0 1 1 -244 0" />
          </defs>
          <text>
            <textPath href="#intro-circle" textLength={2 * Math.PI * 122 - 4} lengthAdjust="spacing">
              {ring}
            </textPath>
          </text>
        </svg>
        <span className="intro__orbit">
          <span className="intro__trail" />
          <span className="intro__ball" />
        </span>
        <span className="intro__mark">
          <span className="intro__name">Nicole Gofman</span>
          <span className="intro__role">Architecture &amp; Technology</span>
        </span>
      </div>
    </div>
  );
}
