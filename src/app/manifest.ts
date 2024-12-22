import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Grocery',
    short_name: 'Grocery',
    description: 'An app for creating synced grocery list',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    theme_color: '#DBCA9A',
    background_color: '#DBCA9A',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
