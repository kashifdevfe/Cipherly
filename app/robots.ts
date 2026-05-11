import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '*.draft',
          '*.tmp',
          '/search',
        ],
      },
    ],
    sitemap: 'https://cipherlyapp.com/sitemap.xml',
  }
}
