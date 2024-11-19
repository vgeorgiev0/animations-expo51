import { _dnd_list_item_height } from '@/constants';
import { dragAndDropListData } from '@/data/DRAG_AND_DROP_LIST_DATA';
import { UpdatedDragAndDropListDataItem } from '@/types/dnd';

export const getDNDInitialPositions = (): UpdatedDragAndDropListDataItem => {
  let itemPositions: UpdatedDragAndDropListDataItem = {};
  for (let i = 0; i < dragAndDropListData.length; i++) {
    itemPositions[i] = {
      updatedIndex: i,
      updatedTop: i * _dnd_list_item_height,
    };
  }

  return itemPositions;
};
