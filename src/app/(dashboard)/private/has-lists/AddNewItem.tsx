'use client';

import React, { useTransition } from 'react';
import type { List } from '@/storage';
import { setListItems } from './setListItems';

export const AddNewItem: React.FC<
  React.PropsWithChildren<{
    listId: string;
    list: List;
  }>
> = ({ listId, list }) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    const newList = {
      ...list,
      items: [...list.items, { text: '', checked: false }],
    };

    startTransition(async () => {
      await setListItems(listId, newList);
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
