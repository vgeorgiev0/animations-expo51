export interface DragAndDropListDataItem {
  id: string;
  title: string;
  description: string;
  market_price: number;
  status: ItemStatus;
  gain_amount: number;
  isStart?: boolean;
}

export enum ItemStatus {
  UP = 'up',
  DOWN = 'down',
}

export interface UpdatedDragAndDropListDataItem {
  [key: string]: {
    updatedIndex: number;
    updatedTop: number;
  };
}

export type NullableNumber = number | null;



export interface Item  {
  key: string;
  label?: string;
  height?: number;
  sectionTitle?: string;
  isSection?: boolean;
};
