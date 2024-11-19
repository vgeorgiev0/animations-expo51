import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  DragAndDropListDataItem,
  NullableNumber,
  UpdatedDragAndDropListDataItem,
} from '@/types/dnd';
import Colors from '@/constants/Colors';
import { _dnd_list_item_height } from '@/constants';
import DNDListItem from './DNDListItem';
import { SharedValue } from 'react-native-reanimated';

interface AnimatedDNDListProps {
  data: DragAndDropListDataItem[];
  isStart: boolean;
  currentItemPosition: SharedValue<UpdatedDragAndDropListDataItem>;
  draggedItemId: SharedValue<NullableNumber>;
  isDragging: SharedValue<0 | 1>;
}

const AnimatedDNDList: React.FC<AnimatedDNDListProps> = ({
  data,
  isStart,
  currentItemPosition,
  draggedItemId,
  isDragging,
}) => {
  return (
    <View>
      <ScrollView
        contentContainerStyle={[
          {
            height: data.length * _dnd_list_item_height,
          },
        ]}
      >
        {data.map((item, index) => (
          <DNDListItem
            isDragging={isDragging}
            draggedItemId={draggedItemId}
            currentItemPosition={currentItemPosition}
            isStart={isStart}
            index={index}
            item={item}
            key={item.id}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default AnimatedDNDList;

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: Colors.light.background,
    flex: 1,
  },
});
