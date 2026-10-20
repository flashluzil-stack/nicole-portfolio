import { Link } from 'react-router-dom';
import { navigation } from '../content/site';
import { useI18n } from '../i18n';
import { ArrowUpRight, LinkedIn } from './Icons';

export function Footer() {
  const { t, c } = useI18n();
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__lead">
          <p className="eyebrow">{t.common.getInTouch}</p>
          <a className="site-footer__mail ltr" href={`mailto:${c.profile.email}`}>
            {c.profile.email}
          </a>
        </div>
        <nav className="site-footer__nav" aria-label={t.nav.footer}>
          <ul>
            {navigation.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{t.nav[item.key]}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="site-footer__social">
          <a href={c.profile.linkedin} target="_blank" rel="noopener noreferrer" className="icon-link">
            <LinkedIn size={16} />
            <span>{t.common.linkedin}</span>
            <ArrowUpRight size={14} />
            <span className="visually-hidden">{t.common.newTab}</span>
          </a>
        </div>
        <p className="site-footer__legal">{t.common.rights(new Date().getFullYear(), c.profile.name)}</p>
      </div>
    </footer>
  );
}
