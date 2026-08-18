import { ViteReactSSG } from 'vite-react-ssg';
import './styles/theme.css';
import './index.css';
import { routes } from './App';

// vite-react-ssg drives both the SSG build (renderToString per route) and the
// client hydration. It provides the router and the react-helmet-async context
// that <Seo> / <Head> use, so no BrowserRouter/HelmetProvider is needed here.
export const createRoot = ViteReactSSG({ routes });
