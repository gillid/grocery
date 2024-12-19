import 'server-only';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { getEnv, isProduction } from '@/env';

type Auth = {
  uuid: string;
};

const getSession = async () => {
  return getIronSession<Auth>(await cookies(), {
    password: getEnv().IRON_SESSION_PASSWORD,
    cookieName: 'auth',
    cookieOptions: {
      secure: isProduction(),
    },
  });
};

const getAuthUncached = async (): Promise<Auth | null> => {
  const session = await getSession();

  if (session.uuid) {
    return {
      uuid: session.uuid,
    };
  }

  return null;
};

export const getAuth = cache(getAuthUncached);

export const getUuid = async (): Promise<string> => {
  'use server';

  const auth = await getAuth();

  if (!auth) {
    throw new Error('Unauthorized');
  }

  return auth.uuid;
};

export const createAuth = async (uuid: string) => {
  const session = await getSession();

  session.uuid = uuid;

  await session.save();
};

export const deleteAuth = async () => {
  const session = await getSession();

  session.destroy();
};
