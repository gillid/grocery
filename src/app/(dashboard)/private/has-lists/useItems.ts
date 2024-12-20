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
  lastSynced: Date.now(),
  isError: false,

  setItems: (items) => {
    set({ items });
  },

  setError: (isError) => {
    set({ isError });
  },
}));

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
    setError(false);

    startTransition(async () => {
      const items = await getListItems(listId);
      setItemsToStore(items);
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
    syncItems();
  }, [listId]);

  const status = isPending
    ? ('pending' as const)
    : isError
      ? ('error' as const)
      : ('success' as const);

  return {
    items,
    lastSynced,
    status,
    setItems,
    syncItems,
  };
};
