import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/400-italic.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/500-italic.css';
import '@fontsource-variable/manrope';
// Hebrew faces (only the Hebrew glyph ranges are downloaded, and only when used).
import '@fontsource/frank-ruhl-libre/hebrew-400.css';
import '@fontsource/frank-ruhl-libre/hebrew-500.css';
import '@fontsource-variable/assistant';
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/pages.css';
import App from './App';
import { LanguageProvider } from './i18n';

// VITE_ROUTER=memory builds a self-contained preview that does not depend on
// the page URL (used for the claude.ai preview); the real site uses paths.
const Router = import.meta.env.VITE_ROUTER === 'memory' ? MemoryRouter : BrowserRouter;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </Router>
  </StrictMode>,
);
