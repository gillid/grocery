'use server';

import { getAuth, refreshAuth } from '@/auth';

export const updateAuthExpiration = async () => {
  const auth = await getAuth();

  if (auth) {
    await refreshAuth();
  }
};
