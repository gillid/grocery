'use client';

import React from 'react';
import { TabCreate } from './create/TabCreate';
import { TabAttach } from './attach/TabAttach';

export const Tabs = () => {
  const [activeTab, setActiveTab] = React.useState<'create' | 'attach'>(
    'create'
  );

  const TabTitle: React.FC<
    React.PropsWithChildren<{
      tab: 'create' | 'attach';
    }>
  > = ({ children, tab }) => {
    const isActive = tab === activeTab;

    return (
      <a
        role='tab'
        onClick={isActive ? undefined : () => setActiveTab(tab)}
        className={`tab ${isActive ? 'tab-active font-semibold' : ''}`}
      >
        {children}
      </a>
    );
  };

  return (
    <>
      <div role='tablist' className='tabs tabs-bordered'>
        <TabTitle tab='create'>Create a new list</TabTitle>
        <TabTitle tab='attach'>Attach existing</TabTitle>
      </div>

      {activeTab === 'create' && <TabCreate />}
      {activeTab === 'attach' && <TabAttach />}
    </>
  );
};
