'use server';

import { revalidatePath } from 'next/cache';
import { linkList } from '@/storage';

export const attachExistingList = async (shareCode: string) => {
  await linkList(shareCode);

  revalidatePath('/');
  revalidatePath('/share');
};
