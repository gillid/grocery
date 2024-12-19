import 'server-only';
import { getUuid } from '@/auth';
import { generateUuid } from '@/random';
import { redis } from './_client';

type UUID = string;

// key - user:${UUID}
type User = {
  lists: string[];
};

const createNewUuid = async () => {
  const uuid = generateUuid();
  const uuidExists = await redis.exists(`user:${uuid}`);

  if (uuidExists) {
    return createNewUuid();
  }

  return uuid;
};

export const createUser = async (): Promise<UUID> => {
  const uuid = await createNewUuid();
  await redis.hset<string[]>(`user:${uuid}`, { lists: [] });

  return uuid;
};

export const setUserLists = async (lists: string[]) => {
  const uuid = await getUuid();

  await redis.hset<string[]>(`user:${uuid}`, { lists });
};

export const getUserLists = async (): Promise<User['lists']> => {
  const uuid = await getUuid();

  const data = await redis.hget<User['lists']>(`user:${uuid}`, 'lists');

  if (!data) {
    throw new Error('User not found');
  }

  return data;
};

export const deleteUser = async () => {
  const uuid = await getUuid();

  await redis.del(`user:${uuid}`);
  await removeDeadLists();
};

export const removeDeadLists = async () => {
  const allUsersKeys = await redis.keys('user:*');
  const allActiveLists: string[] = [];

  for (const userKey of allUsersKeys) {
    const userLists = await redis.hget<string[]>(userKey, 'lists');
    if (userLists) {
      allActiveLists.push(...userLists);
    }
  }

  const allListsKeys = await redis.keys('list:*');
  for (const listKey of allListsKeys) {
    const isActive = allActiveLists.some(
      (listId) => `list:${listId}` === listKey
    );

    if (!isActive) {
      await redis.del(listKey);
    }
  }
};
