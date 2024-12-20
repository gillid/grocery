'use client';

import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
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
import { ListItem } from './ListItem';
import { SyncIndicator } from './SyncIndicator';
import { AddNewItem } from './AddNewItem';
import { useItems } from './useItems';

export const List: React.FC<
  React.PropsWithChildren<{
    listId: string;
  }>
> = ({ listId }) => {
  const { items, lastSynced, status, setItems } = useItems(listId);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newArray = arrayMove(items, oldIndex, newIndex);
      setItems(newArray);
    }
  }

  // TODO: purge checked

  return (
    <>
      <div className='mb-6'>
        <SyncIndicator status={status} lastSynced={lastSynced} />
      </div>

      <div className='mb-2'>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <div>
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
      </div>

      <div className='mt-6'>
        <AddNewItem listId={listId} />
      </div>
    </>
  );
};
