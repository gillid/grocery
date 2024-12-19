type Env = {
  NODE_ENV: NodeJS.ProcessEnv['NODE_ENV'];
  IRON_SESSION_PASSWORD: string;
  KV_REST_API_URL: string;
  KV_REST_API_TOKEN: string;
};

export const getEnv = (): Env => {
  const env = process.env;

  if (!env.IRON_SESSION_PASSWORD) {
    throw new Error('process.env.IRON_SESSION_PASSWORD is not defined');
  }

  if (!env.KV_REST_API_URL || !env.KV_REST_API_TOKEN) {
    throw new Error('process.env.KV_REST_API_* values are not defined');
  }

  return {
    NODE_ENV: env.NODE_ENV,
    IRON_SESSION_PASSWORD: env.IRON_SESSION_PASSWORD,
    KV_REST_API_URL: env.KV_REST_API_URL,
    KV_REST_API_TOKEN: env.KV_REST_API_TOKEN,
  };
};
