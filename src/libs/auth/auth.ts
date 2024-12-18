'use server';

import 'server-only';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';
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

export const createAuth = async () => {
  const session = await getSession();

  session.uuid = randomUUID();

  await session.save();
};

export const deleteAuth = async () => {
  const session = await getSession();

  session.destroy();
};
