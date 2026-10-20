import type { MediaImage } from '../content/types';

interface ImgProps {
  image: MediaImage;
  sizes?: string;
  className?: string;
  /** Load immediately — use for above-the-fold imagery only. */
  priority?: boolean;
}

/** Responsive image with intrinsic size (no layout shift) and lazy loading. */
export function Img({ image, sizes = '100vw', className, priority }: ImgProps) {
  const srcSet = image.srcLarge
    ? `${image.src} ${image.width}w, ${image.srcLarge} ${image.widthLarge ?? image.width * 1.75}w`
    : undefined;
  return (
    <img
      className={className}
      src={image.src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      // @ts-expect-error — fetchpriority is valid HTML, not yet in React 18 types
      fetchpriority={priority ? 'high' : undefined}
    />
  );
}
