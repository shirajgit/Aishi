import { ViteReactSSG } from 'vite-react-ssg';
import './styles/theme.css';
import './index.css';
import { routes } from './App';

// Marks that the client bundle actually executed. CSS gates the scroll-reveal
// hidden start-state behind `.js`, so if this bundle ever fails to load (e.g. a
// stale cached index.html pointing at old hashed chunks) the content still
// renders visible instead of getting stuck at opacity:0. Guarded for the SSG
// build step where `document` doesn't exist.
if (typeof document !== 'undefined') {
  document.documentElement.classList.add('js');
}

// vite-react-ssg drives both the SSG build (renderToString per route) and the
// client hydration. It provides the router and the react-helmet-async context
// that <Seo> / <Head> use, so no BrowserRouter/HelmetProvider is needed here.
export const createRoot = ViteReactSSG({ routes });
