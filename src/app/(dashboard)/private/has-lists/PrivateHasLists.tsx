import { getList, getUserLists } from '@/storage';
import { List } from './List';

export const PrivateHasLists = async () => {
  const userLists = await getUserLists();
  const listId = userLists[0];
  const list = await getList(listId);

  return <List listId={listId} list={list} />;
};
