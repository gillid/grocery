import type { Metadata, Viewport } from 'next';
import { RootLayout } from '../_layout/RootLayout';

const title = 'Grocery';
const description = 'An app for creating synced grocery list';

export const metadata: Metadata = {
  title,
  description,

  applicationName: title,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: title,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: title,
    title: title,
    description: description,
  },
  twitter: {
    card: 'summary',
    title: title,
    description: description,
  },
};

export const viewport: Viewport = {
  themeColor: '#DBCA9A',
};

export default RootLayout;
