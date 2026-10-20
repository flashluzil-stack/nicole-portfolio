import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { Cta } from '../components/Cta';

export default function NotFound() {
  useDocumentMeta('Page not found', 'The page you were looking for could not be found.', '/404');
  return (
    <section className="not-found" aria-labelledby="nf-title">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1 id="nf-title" className="page-hero__title">
          This room <em>doesn’t exist.</em>
        </h1>
        <p className="page-hero__lede">The page may have moved. Here are the ways back in.</p>
        <div className="closing__actions">
          <Cta to="/" variant="solid">
            Home
          </Cta>
          <Cta to="/architecture">Architecture</Cta>
          <Cta to="/technology">Technology</Cta>
        </div>
      </div>
    </section>
  );
}
