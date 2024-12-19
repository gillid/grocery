'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const MenuItem: React.FC<React.PropsWithChildren<{ href: string }>> = ({
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
