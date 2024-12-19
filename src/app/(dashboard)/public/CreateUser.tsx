'use client';

import { useTransition } from 'react';
import { createAndLogin } from './createAndLogin';

export const CreateUser = () => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await createAndLogin();
    });
  };

  return (
    <button className={`btn btn-sm`} disabled={isPending} onClick={handleClick}>
      Create user
    </button>
  );
};
