import { type FC, useEffect } from 'react';

import seoMetadata from '../../seo-metadata.json';

type RouteKey = keyof typeof seoMetadata.routes;

interface SEOProps {
  route: RouteKey;
  noIndex?: boolean;
  pathOverride?: string;
}

const setMeta = (attribute: 'name' | 'property', key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

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

    setMeta('name', 'description', metadata.description);
    setMeta('name', 'robots', noIndex ? 'noindex,follow' : 'index,follow,max-image-preview:large');
    setMeta('property', 'og:title', metadata.title);
    setMeta('property', 'og:description', metadata.description);
    setMeta('property', 'og:image', shareImageUrl);
    setMeta('name', 'twitter:title', metadata.title);
    setMeta('name', 'twitter:description', metadata.description);
    setMeta('name', 'twitter:image', shareImageUrl);

    if (noIndex) {
      document.head.querySelector('link[rel="canonical"]')?.remove();
      document.head.querySelector('meta[property="og:url"]')?.remove();
    } else {
      setMeta('property', 'og:url', canonicalUrl);

      let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = canonicalUrl;
    }
  }, [metadata, noIndex, pathOverride]);

  return null;
};
