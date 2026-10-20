import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { MediaImage } from '../content/types';
import { ArrowLeft, ArrowRight, Close } from './Icons';

interface LightboxProps {
  images: MediaImage[];
  index: number | null;
  onChange: (index: number | null) => void;
  /** Accessible name for the viewer, e.g. the project title. */
  label: string;
}

/**
 * Fullscreen image viewer. Images are always shown whole (object-fit:
 * contain) so drawings keep their annotations and dimensions legible.
 * Keyboard: ← / → to move, Esc to close. Focus is trapped and restored.
 */
export function Lightbox({ images, index, onChange, label }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const open = index !== null && images.length > 0;
  const count = images.length;

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      onChange((index + delta + count) % count);
    },
    [index, count, onChange],
  );

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
      returnFocus.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onChange(null);
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'Tab' && dialogRef.current) {
        const items = [...dialogRef.current.querySelectorAll<HTMLElement>('button')];
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
    return () => document.removeEventListener('keydown', onKey);
  }, [open, go, onChange]);

  // Basic swipe support on touch screens.
  const touchX = useRef<number | null>(null);

  if (!open || index === null) return null;
  const image = images[index];

  return createPortal(
    <div
      ref={dialogRef}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${label} — image viewer`}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="lightbox__bar">
        <p className="lightbox__count" aria-live="polite">
          {index + 1} / {count}
        </p>
        <button ref={closeRef} type="button" className="lightbox__btn" onClick={() => onChange(null)}>
          <Close size={22} />
          <span className="visually-hidden">Close viewer</span>
        </button>
      </div>

      <figure className={`lightbox__figure lightbox__figure--${image.kind}`}>
        <img
          key={image.src}
          src={image.srcLarge ?? image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
        />
        {image.caption && <figcaption>{image.caption}</figcaption>}
      </figure>

      {count > 1 && (
        <>
          <button type="button" className="lightbox__btn lightbox__nav lightbox__nav--prev" onClick={() => go(-1)}>
            <ArrowLeft size={24} />
            <span className="visually-hidden">Previous image</span>
          </button>
          <button type="button" className="lightbox__btn lightbox__nav lightbox__nav--next" onClick={() => go(1)}>
            <ArrowRight size={24} />
            <span className="visually-hidden">Next image</span>
          </button>
        </>
      )}
    </div>,
    document.body,
  );
}
