import { useEffect, useRef, useState, type TouchEvent } from 'react';
import { Link } from 'react-router-dom';
import type { MediaImage } from '../content/types';
import { useI18n } from '../i18n';
import { Img } from './Img';
import { ArrowLeft, ArrowRight } from './Icons';

interface Slide {
  slug: string;
  image: MediaImage;
}

const INTERVAL = 5000;

/**
 * Home page image carousel: crossfades through a few projects. It pauses on
 * hover and keyboard focus, and does not advance on its own when the visitor
 * prefers reduced motion. Each slide links to its project.
 */
export function HeroCarousel({ slides }: { slides: Slide[] }) {
  const { t, c, dir } = useI18n();
  const touch = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const go = (step: number) => setIndex((i) => (i + step + slides.length) % slides.length);

  // Swipe between images on touch screens. In Hebrew the order runs right to left.
  const onTouchStart = (e: TouchEvent) => {
    const p = e.touches[0];
    touch.current = { x: p.clientX, y: p.clientY };
    swiped.current = false;
    setPaused(true);
  };
  const onTouchEnd = (e: TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    setPaused(false);
    if (!start) return;
    const p = e.changedTouches[0];
    const dx = p.clientX - start.x;
    const dy = p.clientY - start.y;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    swiped.current = true;
    const forward = dir === 'rtl' ? dx > 0 : dx < 0;
    go(forward ? 1 : -1);
  };
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (paused || reduced || slides.length < 2) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => window.clearTimeout(id);
  }, [index, paused, reduced, slides.length]);

  const titleOf = (slug: string) => c.architectureProjects.find((p) => p.slug === slug)?.title ?? '';

  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={t.home.carouselLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="carousel__track"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClickCapture={(e) => {
          if (swiped.current) {
            e.preventDefault();
            swiped.current = false;
          }
        }}
      >
        {slides.map((s, i) => (
          <Link
            key={s.image.src}
            to={`/architecture/${s.slug}`}
            className={`carousel__slide${i === index ? ' is-active' : ''}`}
            aria-hidden={i !== index}
            tabIndex={i === index ? 0 : -1}
            aria-label={titleOf(s.slug)}
          >
            <Img image={s.image} priority={i === 0} sizes="(min-width: 1000px) 58vw, 100vw" />
          </Link>
        ))}
      </div>
      {slides.length > 1 && (
        <>
          <button type="button" className="carousel__arrow carousel__arrow--prev" aria-label={t.home.carouselPrev} onClick={() => go(-1)}>
            {dir === 'rtl' ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
          </button>
          <button type="button" className="carousel__arrow carousel__arrow--next" aria-label={t.home.carouselNext} onClick={() => go(1)}>
            {dir === 'rtl' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
          </button>
        </>
      )}
      <div className="carousel__dots" role="group" aria-label={t.home.carouselLabel}>
        {slides.map((s, i) => (
          <button
            key={s.image.src}
            type="button"
            className="carousel__dot"
            aria-pressed={i === index}
            aria-label={t.home.carouselGoTo(i + 1, titleOf(s.slug))}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
