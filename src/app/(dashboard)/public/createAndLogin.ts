'use server';

import { createUser } from '@/storage';
import { createAuth } from '@/auth';
import { revalidatePath } from 'next/cache';

export const createAndLogin = async () => {
  const uuid = await createUser();
  await createAuth(uuid);

  revalidatePath('/');
};
