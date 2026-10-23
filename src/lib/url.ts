// Prefix internal links and /public assets with the deploy base path,
// so the site works both at a domain root and at user.github.io/repo/.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function url(path = '/'): string {
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  return base + (path.startsWith('/') ? path : `/${path}`);
}
