import React from 'react';
import { TbShoppingCartCheck } from 'react-icons/tb';
import { Menu } from './Menu';

export const Header = () => {
  return (
    <header className='fixed top-0 left-0 right-0 bg-base-300 h-[3em] overflow-visible shadow-sm z-30'>
      <nav className='gutter navbar p-0 min-h-0'>
        <div className='flex-1 ml-3'>
          <TbShoppingCartCheck size={24} />
          <span className='ml-1 font-semibold select-none'>Grocery</span>
        </div>
        <Menu />
      </nav>
    </header>
  );
};
