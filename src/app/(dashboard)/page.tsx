import { createAuth, getAuth, getUuid } from '@/auth';
import { getUserLists } from '@/storage';

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

const Private = async () => {
  const uuid = await getUuid();

  if (!uuid) return null;

  const lists = await getUserLists();

  return (
    <>
      <h2>Private</h2>
      <p>UUID: {uuid}</p>
      <p>{lists.length ? lists.join('<br/>') : 'No lists'}</p>
    </>
  );
};

export default async function Dashboard() {
  const auth = await getAuth();

  return (
    <div>
      <h1>Home</h1>
      {auth ? <Private /> : <Public />}
    </div>
  );
}
