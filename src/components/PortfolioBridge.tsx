import { useI18n, Emph } from '../i18n';
import { ArchDrawing } from './ArchDrawing';
import { Cta } from './Cta';

/**
 * Shown where architecture projects appear while the project archive has not
 * yet been imported: it points to Nicole's complete Canva portfolio rather
 * than displaying placeholder work.
 */
export function PortfolioBridge({ compact = false }: { compact?: boolean }) {
  const { t, c } = useI18n();
  return (
    <div className={`bridge${compact ? ' bridge--compact' : ''}`}>
      {!compact && (
        <div className="bridge__drawing">
          <ArchDrawing />
        </div>
      )}
      <div className="bridge__body">
        <p className="eyebrow">{t.architecture.bridgeEyebrow}</p>
        <p className="bridge__title">
          <Emph parts={t.architecture.bridgeTitle} />
        </p>
        <p className="bridge__text">{t.architecture.bridgeText}</p>
        <Cta to={c.profile.architecturePortfolio} external variant="solid">
          {t.architecture.bridgeCta}
        </Cta>
      </div>
    </div>
  );
}
