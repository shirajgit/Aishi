/**
 * JSON-LD structured-data builders. These are rendered into each page's
 * <head> at build time (SSR), so Google sees them in the static HTML and can
 * show rich results: FAQ accordions, breadcrumbs, and service/pricing info.
 */
import { site, type Faq, type Service } from '../data/site';

const SITE_URL = site.url; // https://www.aishitech.online

/** Absolute URL for a route path. */
export const abs = (path: string) => SITE_URL + (path === '/' ? '' : path);

/** Parse a rupee string like "₹12,499" or "₹3,499/mo" into the number 12499. */
function priceValue(raw: string): string {
  const digits = raw.replace(/[^\d]/g, '');
  return digits || '0';
}

/** FAQPage schema — powers the expandable FAQ rich result on Google. */
export function faqPageLd(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** BreadcrumbList schema from an ordered list of {name, path} crumbs. */
export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

/** Service schema with an Offer carrying the current starting price. */
export function serviceLd(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.tag,
    description: service.intro,
    url: abs(`/services/${service.slug}`),
    provider: {
      '@type': 'Organization',
      name: site.name,
      url: SITE_URL,
    },
    areaServed: { '@type': 'Country', name: 'India' },
    offers: {
      '@type': 'Offer',
      price: priceValue(service.startingPrice),
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: abs(`/services/${service.slug}`),
    },
  };
}

/** ItemList of all services — helps Google understand the services listing. */
export function servicesItemListLd(services: Service[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.title,
      url: abs(`/services/${s.slug}`),
    })),
  };
}
