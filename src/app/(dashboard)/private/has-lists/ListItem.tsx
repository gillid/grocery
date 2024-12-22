'use client';

import React from 'react';
import { MdDragIndicator } from 'react-icons/md';
import { useSortable } from '@dnd-kit/sortable';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useItems } from './useItems';

export const ListItem: React.FC<
  React.PropsWithChildren<{
    listId: string;
    id: UniqueIdentifier;
    text: string;
    checked: boolean;
  }>
> = ({ listId, id, text, checked }) => {
  const { items, status, setItems } = useItems(listId);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const disabled = status === 'error';

  const toggleCheck = () => {
    const newItems = items.map((item) => ({
      ...item,
      checked: item.id === id ? !item.checked : item.checked,
    }));

    setItems(newItems);
  };

  const changeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newItems = items.map((item) => ({
      ...item,
      text: item.id === id ? event.target.value : item.text,
    }));

    setItems(newItems, true);
  };

  return (
    <div
      ref={disabled ? undefined : setNodeRef}
      style={style}
      className='flex items-center mb-2 gap-2'
    >
      <span
        className={`btn btn-ghost btn-sm bg-gray-50 px-2 ${disabled ? 'opacity-50' : ''}`}
        {...listeners}
        {...attributes}
      >
        <MdDragIndicator />
      </span>

      <input
        type='checkbox'
        checked={checked}
        disabled={disabled}
        className={`checkbox checkbox-sm ${checked ? 'opacity-30' : ''}`}
        onChange={toggleCheck}
      />

      <input
        type='text'
        placeholder='Type here'
        className={`input input-bordered input-sm w-full max-w-xs ${checked ? 'opacity-30' : ''}`}
        value={text}
        disabled={disabled}
        onChange={changeText}
      />
    </div>
  );
};
