import React from 'react';
import {
  MdOutlineCheckCircleOutline,
  MdOutlineErrorOutline,
} from 'react-icons/md';

export const SyncIndicator: React.FC<{
  isPending: boolean;
  isError: boolean;
}> = ({ isPending, isError }) => {
  if (isPending) {
    return (
      <div className='outline outline-1 outline-indigo-300 rounded-md flex items-center justify-center py-1'>
        <span className='loading loading-ring loading-xs text-indigo-300'></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='outline outline-1 outline-error rounded-md flex items-center justify-center py-1 text-error'>
        <MdOutlineErrorOutline />
      </div>
    );
  }

  return (
    <div className='outline outline-1 outline-emerald-300 rounded-md flex items-center justify-center py-1 text-emerald-300'>
      <MdOutlineCheckCircleOutline />
    </div>
  );
};
