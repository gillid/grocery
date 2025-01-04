import React from 'react';

export default async function About() {
  return (
    <div className='mx-3 mt-3 flex-1'>
      <h1 className='text-xl mb-2'>About</h1>
      <p>
        The app allows to create a grocery list synchronised across multiple
        devices (and possibly users).
      </p>
      <p>
        Check the{' '}
        <a href='https://github.com/gillid/grocery' target='_blank'>
          github repository description
        </a>{' '}
        for tech details.
      </p>
    </div>
  );
}
