import React from 'react';
import { MdOutlineAddBox, MdOutlineIosShare } from 'react-icons/md';
import { userAgent } from 'next/server';
import { headers as getHeaders } from 'next/headers';

export default async function PWA() {
  const headers = await getHeaders();
  const { os } = userAgent({ headers });

  const isIOS = os.name === 'iOS';

  return (
    <div className='mx-3 mt-3 flex-1'>
      <h1 className='text-xl mb-2'>PWA</h1>

      <p className='mb-4'>
        PWA (progressive web app) is an app-like experience, that allows you to
        &quot;download the website&quot; on your phone.
      </p>

      {isIOS && (
        <p>
          To install this app on your iOS device, tap the share button
          <span role='img' aria-label='share icon' className='inline'>
            &nbsp;( <MdOutlineIosShare className='inline mt-[-4px]' /> )&nbsp;
          </span>
          and then &quot;Add to Home Screen&quot;
          <span role='img' aria-label='plus icon' className='inline'>
            &nbsp;( <MdOutlineAddBox className='inline mt-[-1px]' /> )
          </span>
          .
        </p>
      )}
    </div>
  );
}
