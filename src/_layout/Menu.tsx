'use client';

import { TbMenu2 } from 'react-icons/tb';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const MenuItem: React.FC<React.PropsWithChildren<{ href: string }>> = ({
  children,
  href,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  if (isActive) {
    return (
      <li>
        <span className='btn-active btn-disabled'>{children}</span>
      </li>
    );
  }

  return (
    <li>
      <Link href={href}>{children}</Link>
    </li>
  );
};

export const Menu = () => {
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
        <MenuItem href='/share'>Share List</MenuItem>
        <MenuItem href='/settings'>Settings</MenuItem>
        <MenuItem href='/about'>About</MenuItem>
      </ul>
    </div>
  );
};
