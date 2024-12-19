import React from 'react';
import { TbMenu2, TbShoppingCartCheck } from 'react-icons/tb';

export const Header = () => {
  return (
    <header className='absolute top-0 left-0 right-0 bg-amber-200 h-[3em] overflow-hidden shadow-sm'>
      <nav className='gutter navbar p-0 min-h-0'>
        <div className='flex-1 ml-3'>
          <TbShoppingCartCheck size={24} />
          <span className='ml-1 font-semibold select-none'>Grocery</span>
        </div>
        <button className='btn btn-square btn-ghost'>
          <TbMenu2 size={24} />
        </button>
      </nav>
    </header>
  );
};
