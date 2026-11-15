import type { MetadataRoute } from 'next';
import { SITE } from '@/shared/config/site';

/** /robots.txt — разрешаем индексацию и показываем, где карта сайта. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: new URL('/sitemap.xml', SITE.url).toString(),
  };
}
