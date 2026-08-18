import { Head } from 'vite-react-ssg';
import { site } from '../../data/site';

const SITE_URL = site.url; // https://www.aishitech.online
const DEFAULT_IMAGE = `${SITE_URL}/Aishi.png`;

type SeoProps = {
  /** Full document title, e.g. "Services — Aishi Technologies". */
  title: string;
  description: string;
  /** Route path for the canonical / og:url, e.g. "/services". */
  path: string;
  /** Absolute image URL for social previews. Defaults to the site logo. */
  image?: string;
  /** Keep the page out of the index (used on 404 and error states). */
  noindex?: boolean;
  /** One or more JSON-LD blocks to embed for rich results. */
  jsonLd?: object | object[];
};

/**
 * Per-page SEO head. Rendered by react-helmet-async (via vite-react-ssg's
 * <Head>), so at build time these tags land in the static HTML of each route
 * — which is what Google, Bing, and social scrapers (WhatsApp / LinkedIn /
 * Facebook) actually read. Replaces the old useEffect-based setMeta().
 */
export default function Seo({ title, description, path, image = DEFAULT_IMAGE, noindex, jsonLd }: SeoProps) {
  const url = SITE_URL + (path === '/' ? '' : path);
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Aishi Technologies" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="Aishi Technologies" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured data */}
      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Head>
  );
}
