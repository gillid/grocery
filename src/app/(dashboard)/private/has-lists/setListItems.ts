'use server';

import { type List, updateList } from '@/storage';
import { revalidatePath } from 'next/cache';

export const setListItems = async (listId: string, data: List) => {
  await updateList(listId, data);

  revalidatePath('/');
};
