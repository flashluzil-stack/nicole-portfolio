import type { MediaImage, Product } from '../content/types';
import { Img } from './Img';

interface DeviceMockupProps {
  product: Product;
  screen?: MediaImage;
  className?: string;
  priority?: boolean;
}

/**
 * A refined phone frame. With an authentic screenshot it shows the real
 * interface; without one it shows a typographic title screen — never an
 * invented UI.
 */
export function DeviceMockup({ product, screen, className = '', priority }: DeviceMockupProps) {
  return (
    <figure className={`device ${className}`} style={{ ['--device-accent' as string]: product.accent }}>
      <div className="device__frame">
        <div className="device__screen">
          {screen ? (
            <Img image={screen} sizes="(min-width: 900px) 320px, 60vw" priority={priority} />
          ) : (
            <div className="device__title" aria-hidden>
              {product.logo ? (
                <Img image={product.logo} sizes="160px" className="device__logo" />
              ) : (
                <span className="device__wordmark">{product.name}</span>
              )}
              <span className="device__rule" />
              <span className="device__tagline">{product.tagline}</span>
            </div>
          )}
        </div>
        <span className="device__notch" aria-hidden />
      </div>
      {screen?.caption && <figcaption className="device__caption">{screen.caption}</figcaption>}
    </figure>
  );
}
