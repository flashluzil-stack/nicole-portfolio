import { useI18n } from '../i18n';
import { ArchDrawing } from './ArchDrawing';
import { ArrowUpRight } from './Icons';

/**
 * Lists the selected projects by name, linking to Nicole's full portfolio,
 * until their images are imported. No placeholder images are shown.
 */
export function PortfolioIndex() {
  const { t, c } = useI18n();
  return (
    <div className="pindex">
      <div className="pindex__visual">
        <ArchDrawing />
      </div>
      <ol className="pindex__list">
        {c.portfolioIndex.map((p, i) => (
          <li key={p.title}>
            <a href={c.profile.architecturePortfolio} target="_blank" rel="noopener noreferrer" className="pindex__link">
              <span className="pindex__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="pindex__title" lang="en">
                {p.title}
              </span>
              <span className="pindex__cta">
                {t.home.viewInPortfolio} <ArrowUpRight size={14} />
              </span>
              <span className="visually-hidden">{t.common.newTab}</span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
