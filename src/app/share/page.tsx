import React from 'react';
import { redirect } from 'next/navigation';
import { getAuth } from '@/auth';

export default async function Share() {
  const auth = await getAuth();

  if (!auth) {
    redirect('/');
  }

  return (
    <div className='mx-3 mt-3 flex-1'>
      <h1 className='text-xl mb-2'>Share List</h1>
      {auth ? <p>Authorized</p> : <p>Not authorized</p>}
    </div>
  );
}
