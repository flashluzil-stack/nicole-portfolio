import { useI18n } from '../i18n';
import { Download } from './Icons';

/** Download link for Nicole's CV (PDF). */
export function CvLink({ variant = 'line' }: { variant?: 'solid' | 'line' }) {
  const { t, c } = useI18n();
  return (
    <a className={`cta cta--${variant}`} href={c.profile.cv} download="Nicole-Gofman-CV.pdf">
      <span>{t.home.downloadCv}</span>
      <Download size={16} />
      <span className="visually-hidden"> (PDF)</span>
    </a>
  );
}
