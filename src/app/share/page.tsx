import React from 'react';
import { redirect } from 'next/navigation';
import { getAuth } from '@/auth';
import { getExistingLink, getUserLists } from '@/storage';
import { GenerateCode } from './GenerateCode';
import { DisplayCode } from './DisplayCode';

export default async function Share() {
  const auth = await getAuth();

  if (!auth) {
    redirect('/');
  }

  const userLists = await getUserLists();

  if (!userLists.length) {
    redirect('/');
  }

  const existingLink = await getExistingLink();

  return (
    <div className='mx-3 mt-3 flex-1'>
      <h1 className='text-xl mb-2'>Share</h1>

      {existingLink ? <DisplayCode code={existingLink} /> : <GenerateCode />}
    </div>
  );
}
