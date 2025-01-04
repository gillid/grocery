import React from 'react';
import { redirect } from 'next/navigation';
import { getAuth } from '@/auth';
import { DeleteUser } from './DeleteUser';

export default async function Settings() {
  const auth = await getAuth();

  if (!auth) {
    redirect('/');
  }

  return (
    <div className='mx-3 mt-3 flex-1'>
      <h1 className='text-xl mb-2'>Settings</h1>

      <p className='mb-4'>You can delete your user.</p>

      <p>
        <DeleteUser />
      </p>
    </div>
  );
}
