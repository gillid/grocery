'use client';

import React from 'react';
import { MdDragIndicator } from 'react-icons/md';
import { useSortable } from '@dnd-kit/sortable';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export const ListItem: React.FC<
  React.PropsWithChildren<{
    id: UniqueIdentifier;
    text: string;
    checked: boolean;
  }>
> = ({ id, text }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className='flex items-center mb-2 gap-1'
    >
      {/*  TODO: checkbox */}

      <input
        type='text'
        placeholder='Type here'
        className='input input-bordered input-sm w-full max-w-xs'
        value={text}
        disabled={true}
      />

      <span
        className='btn btn-ghost btn-sm px-1'
        {...listeners}
        {...attributes}
      >
        <MdDragIndicator />
      </span>
    </div>
  );
};
