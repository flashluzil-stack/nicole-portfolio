import { Link } from 'react-router-dom';
import type { ArchitectureProject } from '../content/types';
import { useI18n } from '../i18n';
import { Img } from './Img';
import { ArrowRight } from './Icons';

/**
 * Editorial project spread: one large featured project and two supporting
 * projects. Information sits under each image and the summary is revealed
 * on hover or focus.
 */
export function WorkGrid({ projects }: { projects: ArchitectureProject[] }) {
  const { t } = useI18n();
  return (
    <div className="work-grid">
      {projects.map((p, i) => (
        <article key={p.slug} className={`work-item${i === 0 ? ' work-item--featured' : ''}`}>
          <Link to={`/architecture/${p.slug}`} className="work-item__link">
            <div className={`work-item__media work-item__media--${p.cover.kind}`}>
              <Img image={p.cover} sizes={i === 0 ? '(min-width: 1000px) 60vw, 100vw' : '(min-width: 1000px) 35vw, 100vw'} />
              <p className="work-item__summary">{p.summary}</p>
            </div>
            <div className="work-item__meta">
              <span className="work-item__index">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="work-item__title">{p.title}</h3>
              <p className="work-item__details">{[p.type, p.year, p.context].filter(Boolean).join(' · ')}</p>
              <span className="work-item__open">
                {t.home.openProject} <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
