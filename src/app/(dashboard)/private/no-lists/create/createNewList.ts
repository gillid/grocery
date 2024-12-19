'use server';

import { revalidatePath } from 'next/cache';
import { createList } from '@/storage';

export const createNewList = async () => {
  await createList();

  revalidatePath('/');
};
