import React from 'react';
import {
  MdOutlineCheckCircleOutline,
  MdOutlineErrorOutline,
} from 'react-icons/md';

export const SyncIndicator: React.FC<{
  status: 'pending' | 'error' | 'success';
  lastSynced: number;
}> = ({ status }) => {
  switch (status) {
    case 'pending':
      return (
        <div className='outline outline-1 outline-indigo-300 rounded-md flex items-center justify-center py-1'>
          <span className='loading loading-ring loading-xs text-indigo-300'></span>
        </div>
      );

    case 'error':
      return (
        <div className='outline outline-1 outline-error rounded-md flex items-center justify-center py-1 text-error'>
          <MdOutlineErrorOutline />
        </div>
      );

    case 'success':
      return (
        <div className='outline outline-1 outline-emerald-300 rounded-md flex items-center justify-center py-1 text-emerald-300'>
          <MdOutlineCheckCircleOutline />
        </div>
      );
  }
};
