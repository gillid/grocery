import { createAuth, deleteAuth, getAuth } from '@/auth';

const Public = () => (
  <>
    <h2>Public</h2>
    <p>
      <button className='btn' onClick={createAuth}>
        Authorize
      </button>
    </p>
  </>
);

const Private = async () => (
  <>
    <h2>Private</h2>
    <p>Token: {(await getAuth())?.uuid}</p>
    <p>
      <button className='btn' onClick={deleteAuth}>
        Delete auth
      </button>
    </p>
  </>
);

export default async function Home() {
  const auth = await getAuth();

  return (
    <div>
      <h1>Home</h1>
      {auth ? <Private /> : <Public />}
    </div>
  );
}
