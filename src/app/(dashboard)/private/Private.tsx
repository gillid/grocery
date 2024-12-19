import { getUserLists } from '@/storage';
import { PrivateHasLists } from './has-lists/PrivateHasLists';
import { PrivateNoLists } from './no-lists/PrivateNoLists';

export const Private = async () => {
  const lists = await getUserLists();

  return (
    <div className='mx-3 mt-3 flex-1'>
      {lists.length ? <PrivateHasLists /> : <PrivateNoLists />}
    </div>
  );
};
