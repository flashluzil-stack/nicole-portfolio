import { Link } from 'react-router-dom';
import type { ArchitectureProject, MediaImage } from '../content/types';
import { useI18n } from '../i18n';
import { Img } from './Img';

/** Drawings shown on the home page strip, in order: [project slug, image file name]. */
const PICKS: [string, string][] = [
  ['gymnasium', 'sections'],
  ['echoes-of-generations', 'diagrams'],
  ['urban-renewal-tower', 'plan-typical'],
  ['gymnasium', 'elevations'],
  ['echoes-of-generations', 'plan-ground'],
  ['interior-architecture', 'floor-plan-3d'],
  ['urban-renewal-tower', 'section-aa'],
  ['echoes-of-generations', 'elevations'],
  ['gymnasium', 'site-ground-plan'],
];

/**
 * A slowly moving strip of plans, sections and elevations from the projects,
 * each linking to its project. The strip pauses on hover or focus, and with
 * reduced motion it becomes a plain horizontally scrollable row.
 */
export function DrawingStrip({ projects }: { projects: ArchitectureProject[] }) {
  const { t } = useI18n();
  const items = PICKS.flatMap(([slug, file]) => {
    const project = projects.find((p) => p.slug === slug);
    const image = project?.sections.flatMap((s) => s.images).find((im) => im.src.includes(`/${file}-`));
    return project && image ? [{ project, image }] : [];
  });
  if (items.length < 3) return null;

  const row = (copy: boolean) =>
    items.map(({ project, image }: { project: ArchitectureProject; image: MediaImage }) => (
      <li key={`${copy ? 'b' : 'a'}-${image.src}`} className="drawings__item" aria-hidden={copy || undefined}>
        <Link to={`/architecture/${project.slug}`} tabIndex={copy ? -1 : undefined}>
          <span className="drawings__sheet">
            <Img image={image} sizes="(min-width: 900px) 34vw, 80vw" eager />
          </span>
          <span className="drawings__caption">
            <span className="drawings__project">{project.title}</span>
            <span>{image.caption}</span>
          </span>
          <span className="visually-hidden">{t.home.openProject}</span>
        </Link>
      </li>
    ));

  return (
    <div className="drawings__viewport">
      <ul className="drawings__track">
        {row(false)}
        {row(true)}
      </ul>
    </div>
  );
}
