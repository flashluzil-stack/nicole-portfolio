import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { MediaImage } from '../content/types';
import { useI18n } from '../i18n';
import { Img } from './Img';

interface Slide {
  slug: string;
  image: MediaImage;
}

/**
 * Home page image carousel. Each new slide wipes in over the previous one in
 * the reading direction, and the active dot fills as a timer: the slide
 * advances when that fill finishes, so pausing the animation (hover, keyboard
 * focus) pauses the carousel too. With reduced motion there is no fill and
 * the carousel only moves when a dot is pressed. Each slide links to its
 * project.
 */
export function HeroCarousel({ slides }: { slides: Slide[] }) {
  const { t, c } = useI18n();
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const go = (next: number) => {
    if (next === index) return;
    setPrev(index);
    setIndex(next);
  };

  const titleOf = (slug: string) => c.architectureProjects.find((p) => p.slug === slug)?.title ?? '';
  const pad = (n: number) => String(n).padStart(2, '0');
  const auto = !reduced && slides.length > 1;

  return (
    <div
      className={`carousel${paused ? ' is-paused' : ''}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={t.home.carouselLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="carousel__track">
        {slides.map((s, i) => (
          <Link
            key={s.image.src}
            to={`/architecture/${s.slug}`}
            className={`carousel__slide${i === index ? ' is-active' : i === prev ? ' is-prev' : ''}`}
            aria-hidden={i !== index}
            tabIndex={i === index ? 0 : -1}
            aria-label={titleOf(s.slug)}
          >
            {/* Every slide loads up front: a clipped image is never lazy-loaded. */}
            <Img image={s.image} priority={i === 0} eager sizes="(min-width: 1000px) 58vw, 100vw" />
          </Link>
        ))}
        <span className="crop-marks" aria-hidden />
        <div className="carousel__hud" aria-hidden key={index}>
          <span className="carousel__count">
            {pad(index + 1)} <span>/ {pad(slides.length)}</span>
          </span>
          <span className="carousel__title">{titleOf(slides[index].slug)}</span>
        </div>
      </div>
      <div className="carousel__dots" role="group" aria-label={t.home.carouselLabel}>
        {slides.map((s, i) => (
          <button
            key={s.image.src}
            type="button"
            className="carousel__dot"
            aria-pressed={i === index}
            aria-label={t.home.carouselGoTo(i + 1, titleOf(s.slug))}
            onClick={() => go(i)}
          >
            {auto && i === index && (
              <span className="carousel__fill" onAnimationEnd={() => go((index + 1) % slides.length)} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
