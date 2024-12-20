'use client';

import React from 'react';
import { MdCleaningServices, MdSync } from 'react-icons/md';
import { useItems } from '../useItems';

export const SyncActions: React.FC<{
  listId: string;
}> = ({ listId }) => {
  const { status, syncItems } = useItems(listId);

  const isPending = status === 'pending';
  const isError = status === 'error';

  // TODO: clean handler

  return (
    <div className='flex gap-3'>
      <button
        className='btn btn-outline btn-success btn-xs gap-[0.25em]'
        disabled={isPending}
        onClick={syncItems}
      >
        Sync <MdSync />
      </button>
      <button
        className='btn btn-outline btn-error btn-xs gap-[0.25em]'
        disabled={isPending || isError}
      >
        Clean <MdCleaningServices />
      </button>
    </div>
  );
};
