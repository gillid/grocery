import { getList, getUserLists } from '@/storage';
import { List } from './List';
import { AddNewItem } from './AddNewItem';

export const PrivateHasLists = async () => {
  const userLists = await getUserLists();
  const listId = userLists[0];
  const list = await getList(listId);

  // TODO: purge checked

  return (
    <>
      <List listId={listId} list={list} />

      <p className='mt-6'>
        <AddNewItem listId={listId} list={list} />
      </p>
    </>
  );
};
