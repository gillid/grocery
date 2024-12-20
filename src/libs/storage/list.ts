import 'server-only';
import { generateHex } from '@/random';
import { redis } from './_client';
import { getUserLists, setUserLists } from './user';

type ListId = string;

// key - list:${ListId}
export type List = {
  items: ListItem[];
};

type ListItem = {
  id: string;
  text: string;
  checked: boolean;
};

const createNewListId = async () => {
  const listId = generateHex();
  const listIdExists = await redis.exists(`list:${listId}`);

  if (listIdExists) {
    return createNewListId();
  }

  return listId;
};

export const createList = async (): Promise<ListId> => {
  const userLists = await getUserLists();

  const listId = await createNewListId();

  await redis.hset<ListItem[]>(`list:${listId}`, { items: [] });
  await setUserLists([...userLists, listId]);

  return listId;
};

export const getList = async (listId: string): Promise<List> => {
  const userLists = await getUserLists();

  if (!userLists.includes(listId)) {
    throw new Error('Unauthorized');
  }

  const data = await redis.hgetall<List>(`list:${listId}`);

  if (!data) {
    throw new Error('List not found');
  }

  return data;
};

export const updateList = async (listId: string, data: List) => {
  const userLists = await getUserLists();

  if (!userLists.includes(listId)) {
    throw new Error('Unauthorized');
  }

  await redis.hset<List[keyof List]>(`list:${listId}`, data);
};
