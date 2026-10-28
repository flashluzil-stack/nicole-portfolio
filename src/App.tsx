import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';

const About = lazy(() => import('./pages/About'));
const Technology = lazy(() => import('./pages/Technology'));
const Architecture = lazy(() => import('./pages/Architecture'));
const ArchitectureProject = lazy(() => import('./pages/ArchitectureProject'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="technology" element={<Technology />} />
        <Route path="architecture" element={<Architecture />} />
        <Route path="architecture/:slug" element={<ArchitectureProject />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
