import 'server-only';
import { revalidatePath } from 'next/cache';
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

  revalidatePath('/');

  return uuid;
};

export const setUserLists = async (lists: string[]) => {
  const uuid = await getUuid();

  await redis.hset<string[]>(`user:${uuid}`, { lists });

  revalidatePath('/');
};

export const getUserLists = async (): Promise<User['lists']> => {
  const uuid = await getUuid();

  const data = await redis.hget<User['lists']>(`user:${uuid}`, 'lists');

  if (!data) {
    throw new Error('User not found');
  }

  return data;
};
