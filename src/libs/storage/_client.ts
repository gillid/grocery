import 'server-only';
import { Redis } from '@upstash/redis';
import { getEnv } from '@/env';

export const redis = new Redis({
  url: getEnv().KV_REST_API_URL,
  token: getEnv().KV_REST_API_TOKEN,
});
