type Env = {
  NODE_ENV: NodeJS.ProcessEnv['NODE_ENV'];
  IRON_SESSION_PASSWORD: string;
};

export const getEnv = (): Env => {
  const env = process.env;

  if (!env.IRON_SESSION_PASSWORD) {
    throw new Error('process.env.IRON_SESSION_PASSWORD is not defined');
  }

  return {
    NODE_ENV: env.NODE_ENV,
    IRON_SESSION_PASSWORD: env.IRON_SESSION_PASSWORD,
  };
};
