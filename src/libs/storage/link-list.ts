import 'server-only';
import { generateHex } from '@/random';
import { redis } from './_client';
import { getUserLists, setUserLists } from './user';

// key - link:${LinkId}

const createNewLinkId = async () => {
  const linkId = generateHex();
  const linkIdExists = await redis.exists(`link:${linkId}`);

  if (linkIdExists) {
    return createNewLinkId();
  }

  return linkId;
};

export const createLink = async (listId: string): Promise<string> => {
  const linkId = await createNewLinkId();

  await redis.set<string>(`link:${linkId}`, listId);

  return linkId;
};

export const linkList = async (linkId: string) => {
  const userLists = await getUserLists();
  const listId = await redis.get<string>(`link:${linkId}`);

  if (!listId) {
    throw new Error('Link not found');
  }

  const listExists = redis.exists(`list:${listId}`);

  if (!listExists) {
    throw new Error('List not found');
  }

  const newLists = [...userLists, listId];
  await setUserLists(newLists);

  await redis.del(`link:${linkId}`);
};
