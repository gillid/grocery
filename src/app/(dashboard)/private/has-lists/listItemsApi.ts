'use server';

import { type List, updateList, getList } from '@/storage';
import { revalidatePath } from 'next/cache';

export const getListItems = async (listId: string): Promise<List['items']> => {
  const list = await getList(listId);

  return list.items;
};

export const setListItems = async (listId: string, items: List['items']) => {
  await updateList(listId, { items });

  revalidatePath('/');
};
