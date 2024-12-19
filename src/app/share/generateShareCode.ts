'use server';

import { createLink, getUserLists } from '@/storage';
import { revalidatePath } from 'next/cache';

export const generateShareCode = async () => {
  const userLists = await getUserLists();

  if (!userLists.length) {
    throw new Error('No lists found');
  }

  const firstList = userLists[0];

  await createLink(firstList);

  revalidatePath('/share');
};
