import { useEffect, useTransition } from 'react';
import { create } from 'zustand/react';
import type { List } from '@/storage';
import { getListItems, setListItems } from './listItemsApi';

type ItemsState = {
  lastSynced: number;
  items: List['items'];
  isError: boolean;
  setItems: (items: List['items']) => void;
  setError: (isError: boolean) => void;
};

const useItemsStore = create<ItemsState>((set) => ({
  items: [],
  lastSynced: 0,
  isError: false,

  setItems: (items) => {
    set({ items, lastSynced: Date.now() });
  },

  setError: (isError) => {
    set({ isError });
  },
}));

let initialSyncDone = false;

export const useItems = (listId: string) => {
  const [isPending, startTransition] = useTransition();
  const {
    items,
    lastSynced,
    isError,
    setItems: setItemsToStore,
    setError,
  } = useItemsStore();

  const syncItems = () => {
    startTransition(async () => {
      const items = await getListItems(listId);
      setItemsToStore(items);
      setError(false);
    });
  };

  const setItems = (items: List['items']) => {
    setError(false);

    startTransition(async () => {
      setItemsToStore(items);

      try {
        await setListItems(listId, items);
      } catch (err) {
        setError(err ? true : true);
      }
    });
  };

  useEffect(() => {
    if (initialSyncDone) return;

    syncItems();
    initialSyncDone = true;
  }, [listId]);

  const status = (function () {
    if (lastSynced === 0) return 'pending';

    if (isPending) return 'pending';

    if (isError) return 'error';

    return 'success';
  })();

  return {
    items,
    lastSynced,
    status,
    setItems,
    syncItems,
  };
};
