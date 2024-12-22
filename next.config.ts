import type { NextConfig } from 'next';
import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
  swSrc: 'src/sw/index.ts',
  swDest: 'public/sw.js',
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default withSerwist(nextConfig);
