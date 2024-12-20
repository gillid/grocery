'use client';

import React, { useTransition } from 'react';
import type { List } from '@/storage';
import { setListItems } from './listItemsApi';

export const AddNewItem: React.FC<
  React.PropsWithChildren<{
    listId: string;
    list: List;
  }>
> = ({ listId, list }) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await setListItems(listId, [...list.items, { text: '', checked: false }]);
    });
  };

  return (
    <button
      className={`btn btn-sm btn-block`}
      disabled={isPending}
      onClick={handleClick}
    >
      Add item
    </button>
  );
};
