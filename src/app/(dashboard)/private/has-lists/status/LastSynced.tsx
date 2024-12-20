'use client';

import React, { useEffect } from 'react';
import {
  MdOutlineCheckCircleOutline,
  MdOutlineErrorOutline,
  MdOutlineWarningAmber,
} from 'react-icons/md';
import { useItems } from '../useItems';

export const LastSynced: React.FC<{
  listId: string;
}> = ({ listId }) => {
  const { status, lastSynced } = useItems(listId);
  const [, increment] = React.useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      increment((i) => i + 1);
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (status === 'error') {
    return (
      <div className='flex-1 text-sm text-error italic flex items-center justify-end'>
        <span className='mr-1 inline-block h-4 leading-none'>sync failure</span>
        <MdOutlineErrorOutline />
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div className='flex-1 text-sm text-indigo-300 italic flex items-center justify-end'>
        <span className='mr-1 inline-block h-4 leading-none'>updating</span>
        <span className='loading loading-ring loading-xs'></span>
      </div>
    );
  }

  const now = Date.now();
  const diff = now - lastSynced;

  if (diff < 60 * 1000) {
    return (
      <div className='flex-1 text-sm text-emerald-300 italic flex items-center justify-end'>
        <span className='mr-1 inline-block h-4 leading-none'>
          synced recently
        </span>
        <MdOutlineCheckCircleOutline />
      </div>
    );
  }

  if (diff < 60 * 60 * 1000) {
    const minutes = Math.floor(diff / (60 * 1000));

    const isStale = minutes > 15;

    const color = isStale ? 'text-warning' : 'text-emerald-300';
    const Icon = isStale ? MdOutlineWarningAmber : MdOutlineCheckCircleOutline;

    return (
      <div
        className={`flex-1 text-sm ${color} italic flex items-center justify-end`}
      >
        <span className='mr-1 inline-block h-4 leading-none'>
          synced {minutes}m ago
        </span>
        <Icon />
      </div>
    );
  }

  const hours = Math.floor(diff / (60 * 60 * 1000));

  return (
    <div
      className={`flex-1 text-sm text-error italic flex items-center justify-end`}
    >
      <span className='mr-1 inline-block h-4 leading-none'>
        synced {hours}h ago
      </span>
      <MdOutlineWarningAmber />
    </div>
  );
};
