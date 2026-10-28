import { type FC, useEffect } from 'react';

import seoMetadata from '../../seo-metadata.json';

type RouteKey = keyof typeof seoMetadata.routes;

interface SEOProps {
  route: RouteKey;
  noIndex?: boolean;
  pathOverride?: string;
}

const setMeta = (
  selector: string,
  attribute: 'name' | 'property',
  key: string,
  content: string
) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
};

export const SEO: FC<SEOProps> = ({ route, noIndex = false, pathOverride }) => {
  const metadata = seoMetadata.routes[route];

  useEffect(() => {
    const canonicalUrl = new URL(pathOverride ?? metadata.path, seoMetadata.siteUrl).toString();
    const shareImageUrl = new URL(seoMetadata.shareImage, seoMetadata.siteUrl).toString();
    document.title = metadata.title;
    document.documentElement.lang = 'en';

    setMeta('meta[name="description"]', 'name', 'description', metadata.description);
    setMeta(
      'meta[name="robots"]',
      'name',
      'robots',
      noIndex ? 'noindex,follow' : 'index,follow,max-image-preview:large'
    );
    setMeta('meta[property="og:title"]', 'property', 'og:title', metadata.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', metadata.description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMeta('meta[property="og:image"]', 'property', 'og:image', shareImageUrl);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', metadata.title);
    setMeta(
      'meta[name="twitter:description"]',
      'name',
      'twitter:description',
      metadata.description
    );
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', shareImageUrl);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [metadata, noIndex, pathOverride]);

  return null;
};
