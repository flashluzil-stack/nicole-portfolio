import { Link } from 'react-router-dom';
import { navigation } from '../content/site';
import { profile } from '../content/profile';
import { ArrowUpRight, LinkedIn } from './Icons';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__lead">
          <p className="eyebrow">Get in touch</p>
          <a className="site-footer__mail" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </div>
        <nav className="site-footer__nav" aria-label="Footer">
          <ul>
            {navigation.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="site-footer__social">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="icon-link">
            <LinkedIn size={16} />
            <span>LinkedIn</span>
            <ArrowUpRight size={14} />
            <span className="visually-hidden">(opens in a new tab)</span>
          </a>
        </div>
        <p className="site-footer__legal">
          © {new Date().getFullYear()} {profile.name}. All work shown is by Nicole Gofman.
        </p>
      </div>
    </footer>
  );
}
