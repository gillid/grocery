import { getUserLists } from '@/storage';
import { List } from './List';

export const PrivateHasLists = async () => {
  const userLists = await getUserLists();
  const listId = userLists[0];

  return <List listId={listId} />;
};
