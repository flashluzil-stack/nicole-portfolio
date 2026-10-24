import { useEffect, type RefObject } from 'react';

/**
 * Scroll-driven reveals for the whole site, applied from one place so the
 * page components stay free of animation code.
 *
 * Elements matching the selectors below are tagged with `data-fx` and
 * revealed (`.is-in`) the first time they scroll into view:
 * - `words`: display headings, whose words (see <Emph>) rise out of a mask
 * - `wipe`: photographs, uncovered in the reading direction
 * - `plot`: drawings, uncovered top to bottom behind a scan line, like a plotter
 * - `line`: the experience timeline, which animates its own parts
 * - `rise`: everything else that should arrive with the content
 *
 * Nothing is hidden unless `html.fx` is set, which only happens when the
 * visitor has not asked for reduced motion, so content is never lost.
 */
const FX: [fx: string, selector: string][] = [
  ['words', 'h1, h2'],
  // The experience timeline draws its own line and entries (motion.css).
  ['line', '.timeline'],
  [
    'plot',
    '.plate--drawing, .project__cover--drawing, .work-item__media--drawing, .project-card__media--drawing, .drawings__item',
  ],
  [
    'wipe',
    '.work-item__media, .project-card__media, .project__cover, .plate, .arch-hero__image, .case__stage, .board-grid li, .home-hero__image, .studio__icons',
  ],
  [
    'rise',
    [
      '.eyebrow',
      '.section-heading__aside',
      '.home-hero__lede',
      '.home-hero__actions',
      '.facts li',
      '.office',
      '.compact-list li',
      '.tech-strip__list > li',
      '.feature-list li',
      '.product-index li',
      '.project__facts',
      '.project__summary',
      '.project-section__head p',
      '.closing__actions',
      '.case__facts',
      '.case__tagline',
      '.case__block',
      '.page-hero__lede',
      '.studio__text',
      '.studio__logo',
      '.project-pager',
      '.experience__actions',
      '.experience__label',
      '.practice__item',
      '.filters',
      '.screen-row li',
      '.contact__lede',
      '.contact__channels > li',
      '.contact-form',
      '.work-item__meta',
      '.project-card__meta',
    ].join(', '),
  ],
];

export function useReveal(key: string) {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches || !('IntersectionObserver' in window)) {
      root.classList.remove('fx');
      return;
    }
    root.classList.add('fx');

    // A fully clipped element never counts as intersecting, so wipes and
    // plots are observed through their parent and revealed from there.
    const pending = new Map<Element, HTMLElement[]>();
    // The browser will not lazy-load an image inside a fully clipped element,
    // so start those images a screen ahead of their reveal.
    const eager = (el: Element) =>
      el.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => (img.loading = 'eager'));
    const prefetch = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          eager(e.target);
          prefetch.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px 120% 0px' },
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          for (const el of pending.get(e.target) ?? []) {
            eager(el);
            el.classList.add('is-in');
          }
          pending.delete(e.target);
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    const scan = () => {
      const main = document.getElementById('main');
      if (!main) return;
      for (const [fx, selector] of FX) {
        main.querySelectorAll<HTMLElement>(selector).forEach((el) => {
          if (el.dataset.fx) return;
          // Headings only animate when they were split into words.
          if (fx === 'words' && !el.querySelector('.w')) return;
          // Inside a wipe or plot, an element arrives with its container.
          if (el.parentElement?.closest('[data-fx="wipe"], [data-fx="plot"]')) return;
          el.dataset.fx = fx;
          // Stagger siblings of the same kind, a few at a time.
          const siblings = el.parentElement ? Array.from(el.parentElement.children) : [el];
          const i = siblings.filter((s) => (s as HTMLElement).dataset.fx === fx).indexOf(el);
          el.style.setProperty('--fx-i', String(Math.max(0, i) % 6));
          const target = (fx === 'wipe' || fx === 'plot') && el.parentElement ? el.parentElement : el;
          if (!pending.has(target)) {
            pending.set(target, []);
            io.observe(target);
            if (target !== el) prefetch.observe(target);
          }
          pending.get(target)!.push(el);
        });
      }
    };

    // Lazy pages, filters and language switches add elements later.
    let frame = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    });
    const start = () => {
      scan();
      const main = document.getElementById('main');
      if (main) mo.observe(main, { childList: true, subtree: true });
    };
    // While the opening screen plays, hold the reveals so they happen in view.
    const waiting = root.classList.contains('intro-on');
    if (waiting) window.addEventListener('intro:done', start, { once: true });
    else start();

    return () => {
      window.removeEventListener('intro:done', start);
      cancelAnimationFrame(frame);
      mo.disconnect();
      io.disconnect();
      prefetch.disconnect();
    };
  }, [key]);
}

/** Thin progress line under the header that follows the page scroll. */
export function useScrollProgress(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      ref.current?.style.setProperty('--p', String(max > 0 ? Math.min(1, window.scrollY / max) : 0));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref]);
}
