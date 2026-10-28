import { type FC, useEffect } from 'react';

const siteUrl = 'https://hire-tanishraj.vercel.app';
const shareImage = `${siteUrl}/assets/online-editor.png`;

interface SEOProps {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}

const setMeta = (selector: string, attribute: 'name' | 'property', key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
};

export const SEO: FC<SEOProps> = ({ title, description, path, noIndex = false }) => {
  useEffect(() => {
    const canonicalUrl = new URL(path, siteUrl).toString();
    document.title = title;
    document.documentElement.lang = 'en';

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta(
      'meta[name="robots"]',
      'name',
      'robots',
      noIndex ? 'noindex,follow' : 'index,follow,max-image-preview:large',
    );
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMeta('meta[property="og:image"]', 'property', 'og:image', shareImage);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', shareImage);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [title, description, path, noIndex]);

  return null;
};
