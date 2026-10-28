const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const buildDirectory = path.join(projectRoot, 'build');
const seoMetadata = require(path.join(projectRoot, 'src/seo-metadata.json'));
const siteUrl = new URL(process.env.REACT_APP_SITE_URL || seoMetadata.siteUrl).origin;

const escapeAttribute = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const setMeta = (html, attribute, key, value) => {
  const tag = `<meta ${attribute}="${key}" content="${escapeAttribute(value)}"/>`;
  const existingTag = new RegExp(
    `<meta\\b(?=[^>]*\\b${attribute}="${escapeRegExp(key)}")[^>]*>`,
    'i'
  );

  if (existingTag.test(html)) {
    return html.replace(existingTag, tag);
  }

  return html.replace(/<head[^>]*>/i, (head) => `${head}${tag}`);
};

const setCanonical = (html, canonicalUrl) => {
  const tag = `<link rel="canonical" href="${escapeAttribute(canonicalUrl)}"/>`;
  const existingTag = /<link\b(?=[^>]*\brel="canonical")[^>]*>/i;

  if (existingTag.test(html)) {
    return html.replace(existingTag, tag);
  }

  return html.replace(/<head[^>]*>/i, (head) => `${head}${tag}`);
};

const createRouteHtml = (template, metadata, { noIndex = false, canonical = true } = {}) => {
  const canonicalUrl = new URL(metadata.path, siteUrl).toString();
  const shareImageUrl = new URL(seoMetadata.shareImage, siteUrl).toString();
  let html = template.replace(/<title>[^<]*<\/title>/i, `<title>${metadata.title}</title>`);
  html = html.replace(/("url"\s*:\s*")[^"]+("\s*,)/, `$1${siteUrl}/$2`);

  html = setMeta(html, 'name', 'description', metadata.description);
  html = setMeta(
    html,
    'name',
    'robots',
    noIndex ? 'noindex,follow' : 'index,follow,max-image-preview:large'
  );
  html = setMeta(html, 'property', 'og:title', metadata.title);
  html = setMeta(html, 'property', 'og:description', metadata.description);
  html = setMeta(html, 'property', 'og:image', shareImageUrl);
  html = setMeta(html, 'property', 'og:image:width', '1200');
  html = setMeta(html, 'property', 'og:image:height', '630');
  html = setMeta(html, 'property', 'og:image:alt', 'Tanish Raj, Senior Frontend Engineer');
  html = setMeta(html, 'name', 'twitter:title', metadata.title);
  html = setMeta(html, 'name', 'twitter:description', metadata.description);
  html = setMeta(html, 'name', 'twitter:image', shareImageUrl);

  if (canonical) {
    html = setMeta(html, 'property', 'og:url', canonicalUrl);
    html = setCanonical(html, canonicalUrl);
  } else {
    html = html.replace(/<link\b(?=[^>]*\brel="canonical")[^>]*>/i, '');
    html = html.replace(/<meta\b(?=[^>]*\bproperty="og:url")[^>]*>/i, '');
    html = html.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i, '');
  }

  return html;
};

const templatePath = path.join(buildDirectory, 'index.html');
const template = fs.readFileSync(templatePath, 'utf8');

Object.values(seoMetadata.routes)
  .filter((metadata) => metadata.path !== '/404')
  .forEach((metadata) => {
    const html = createRouteHtml(template, metadata);
    const routeDirectory =
      metadata.path === '/'
        ? buildDirectory
        : path.join(buildDirectory, metadata.path.replace(/^\/+|\/+$/g, ''));
    const routeFile = path.join(routeDirectory, 'index.html');

    fs.mkdirSync(routeDirectory, { recursive: true });
    fs.writeFileSync(routeFile, html);
    console.log(`Created route metadata page: ${metadata.path}`);
  });

const notFoundHtml = createRouteHtml(template, seoMetadata.routes.notFound, {
  noIndex: true,
  canonical: false,
});
fs.writeFileSync(path.join(buildDirectory, '404.html'), notFoundHtml);
console.log('Created static 404 page: /404.html');

const sitemapUrls = Object.values(seoMetadata.routes)
  .filter((metadata) => metadata.path !== '/404')
  .map((metadata) => `  <url><loc>${new URL(metadata.path, siteUrl).toString()}</loc></url>`)
  .join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`;
fs.writeFileSync(path.join(buildDirectory, 'sitemap.xml'), sitemap);
fs.writeFileSync(
  path.join(buildDirectory, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
);
console.log('Created sitemap.xml and robots.txt');
