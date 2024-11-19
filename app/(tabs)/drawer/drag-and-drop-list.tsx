import { SafeAreaView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import AnimatedDNDList from '@/components/DND/AnimatedDNDList';
import { dragAndDropListData } from '@/data/DRAG_AND_DROP_LIST_DATA';
import { StatusBar } from 'expo-status-bar';
import DNDHeader from '@/components/DND/DNDHeader';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NullableNumber, UpdatedDragAndDropListDataItem } from '@/types/dnd';
import { getDNDInitialPositions } from '@/utils/getDNDInitialPositions';
import { useSharedValue } from 'react-native-reanimated';
import Example from '@/components/DND/Dep';

interface DragAndDropScreenProps {}

const DragAndDropScreen: React.FC<DragAndDropScreenProps> = ({}) => {
  const [start, setStart] = useState(false);

  const currentItemPosition = useSharedValue<UpdatedDragAndDropListDataItem>(
    getDNDInitialPositions()
  );

  const isDragging = useSharedValue<0 | 1>(0);
  const draggedItemId = useSharedValue<NullableNumber>(null);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor='white' style='dark' />
        <DNDHeader
          onPress={() => {
            setStart(!start);
          }}
          title='Market trends'
          withSwipe={start}
        />
        {/* <AnimatedDNDList
          draggedItemId={draggedItemId}
          isDragging={isDragging}
          currentItemPosition={currentItemPosition}
          isStart={start}
          data={dragAndDropListData}
        /> */}
        <Example />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default DragAndDropScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
