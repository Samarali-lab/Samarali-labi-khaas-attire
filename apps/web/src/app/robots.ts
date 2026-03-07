import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const BASE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://khaasattire.pk';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/account/', '/admin/', '/checkout/', '/cart/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
