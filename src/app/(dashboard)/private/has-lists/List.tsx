'use client';

import React, { useState, useTransition } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  type UniqueIdentifier,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from '@dnd-kit/modifiers';
import type { List as ListType } from '@/storage';
import { ListItem } from './ListItem';
import { setListItems } from './setListItems';
import { SyncIndicator } from './SyncIndicator';

type LocalItem = ListType['items'][number] & {
  id: UniqueIdentifier;
};

export const List: React.FC<
  React.PropsWithChildren<{
    listId: string;
    list: ListType;
  }>
> = ({ listId, list }) => {
  const [items, setItems] = React.useState<LocalItem[]>(
    list.items.map((item, index) => ({
      ...item,
      id: index,
    }))
  );

  const [isPending, startTransition] = useTransition();
  const [isError, setError] = useState<boolean>(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const setItemsAndSync = (newArray: LocalItem[]) => {
    setItems(newArray);

    startTransition(async () => {
      setError(false);

      try {
        await setListItems(listId, {
          items: newArray.map((item) => ({
            text: item.text,
            checked: item.checked,
          })),
        });
      } catch (err) {
        setError(err ? true : true);
      }
    });
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const indices = items.map((item) => item.id);
      const oldIndex = indices.indexOf(active.id);
      const newIndex = indices.indexOf(over.id);

      const newArray = arrayMove(items, oldIndex, newIndex);
      setItemsAndSync(newArray);
    }
  }

  return (
    <>
      <div className='mb-6'>
        <SyncIndicator isPending={isPending} isError={isError} />
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className='mb-2'>
            {items.map((item) => (
              <ListItem
                key={item.id}
                id={item.id}
                text={item.text}
                checked={item.checked}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
};
