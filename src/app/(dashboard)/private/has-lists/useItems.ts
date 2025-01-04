import { useCallback, useEffect, useMemo, useTransition } from 'react';
import { create } from 'zustand/react';
import debounce from 'lodash.debounce';
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

  const postItems = useCallback((items: List['items']) => {
    startTransition(async () => {
      try {
        await setListItems(listId, items);
      } catch (err) {
        setError(err ? true : true);
      }
    });
  }, []);

  const postItemsDebounced = useMemo(
    () => debounce(postItems, 200),
    [postItems]
  );

  const setItems = (items: List['items'], useDebounce = false) => {
    setError(false);
    setItemsToStore(items);

    if (useDebounce) {
      postItemsDebounced(items);
    } else {
      postItems(items);
    }
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

export const useResetItems = () => {
  const { setItems: setItemsToStore } = useItemsStore();

  return {
    reset: () => {
      setItemsToStore([]);
      initialSyncDone = false;
    },
  };
};
