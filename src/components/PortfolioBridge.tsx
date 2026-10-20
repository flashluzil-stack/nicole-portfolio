import { profile } from '../content/profile';
import { ArchDrawing } from './ArchDrawing';
import { Cta } from './Cta';

/**
 * Shown where architecture projects appear while the project archive has not
 * yet been imported: it points to Nicole's complete Canva portfolio rather
 * than displaying placeholder work.
 */
export function PortfolioBridge({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`bridge${compact ? ' bridge--compact' : ''}`}>
      {!compact && (
        <div className="bridge__drawing">
          <ArchDrawing />
        </div>
      )}
      <div className="bridge__body">
        <p className="eyebrow">Architecture portfolio</p>
        <p className="bridge__title">
          Projects, drawings <em>and</em> visualizations.
        </p>
        <p className="bridge__text">
          Nicole’s complete architecture portfolio — her projects with their drawings and visualizations — is
          published as an interactive portfolio.
        </p>
        <Cta to={profile.architecturePortfolio} external variant="solid">
          Open the architecture portfolio
        </Cta>
      </div>
    </div>
  );
}
