'use client';

import React, { useTransition } from 'react';
import { useResetItems } from '../(dashboard)/private/has-lists/useItems';
import { deleteAndLogout } from './deleteAndLogout';

export const DeleteUser = () => {
  const [isPending, startTransition] = useTransition();
  const { reset } = useResetItems();

  const handleClick = () => {
    startTransition(async () => {
      await deleteAndLogout();
      reset();
    });
  };

  return (
    <button
      className='btn btn-sm btn-error'
      disabled={isPending}
      onClick={handleClick}
    >
      Delete User
    </button>
  );
};
