import { CreateUser } from './CreateUser';

export const Public = () => {
  return (
    <div className='mx-3 mt-3 flex-1'>
      <h1 className='text-xl mb-2'>Welcome!</h1>
      <p className='mb-2'>
        This app uses device-based auth. Meaning you don&apos;t need to enter
        email or password. Yet keep in mind - your data will be tied to the
        device.
      </p>

      <p className='mb-2'>
        You can share your lists between devices though, but let&apos;s start
        with creating a user.
      </p>

      <p className='mt-4'>
        <CreateUser />
      </p>
    </div>
  );
};
