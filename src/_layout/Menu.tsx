import React from 'react';
import { TbMenu2 } from 'react-icons/tb';
import { MenuItem } from './MenuItem';
import { getAuth } from '@/auth';

export const Menu = async () => {
  const auth = await getAuth();

  const isStandalone = (function () {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.matchMedia('(display-mode: standalone)').matches;
  })();

  return (
    <div className='dropdown dropdown-end'>
      <div tabIndex={0} role='button' className='btn btn-square btn-ghost'>
        <TbMenu2 size={24} />
      </div>
      <ul
        tabIndex={0}
        className='dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow'
      >
        <MenuItem href='/'>Dashboard</MenuItem>
        {auth && <MenuItem href='/share'>Share</MenuItem>}
        {!isStandalone && <MenuItem href='/pwa'>PWA</MenuItem>}
        {auth && <MenuItem href='/settings'>Settings</MenuItem>}
        <MenuItem href='/about'>About</MenuItem>
      </ul>
    </div>
  );
};
