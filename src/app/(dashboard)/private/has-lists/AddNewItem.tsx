'use client';

import React from 'react';
import { generateHex } from '@/random';
import { useItems } from './useItems';

export const AddNewItem: React.FC<
  React.PropsWithChildren<{
    listId: string;
  }>
> = ({ listId }) => {
  const { items, status, setItems } = useItems(listId);

  const handleClick = () => {
    setItems([...items, { id: generateHex(4), text: '', checked: false }]);
  };

  return (
    <button
      className={`btn btn-sm btn-block`}
      disabled={status === 'pending'}
      onClick={handleClick}
    >
      Add item
    </button>
  );
};
