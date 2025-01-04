'use server';

import { deleteUser } from '@/storage';
import { deleteAuth } from '@/auth';
import { revalidatePath } from 'next/cache';

export const deleteAndLogout = async () => {
  await deleteUser();
  await deleteAuth();

  revalidatePath('/settings');
  revalidatePath('/share');
  revalidatePath('/');
};
