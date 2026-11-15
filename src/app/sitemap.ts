import type { MetadataRoute } from 'next';
import { ROUTES } from '@/shared/config';
import { SITE } from '@/shared/config/site';

/** /sitemap.xml — список страниц для поисковиков. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [ROUTES.HOME, ROUTES.TOP_PLACES, ROUTES.CAFES, ROUTES.CALCULATOR].map((path) => ({
    url: new URL(path, SITE.url).toString(),
    changeFrequency: 'monthly',
    priority: path === ROUTES.HOME ? 1 : 0.8,
  }));
}
