import {
  DragAndDropListDataItem,
  NullableNumber,
  UpdatedDragAndDropListDataItem,
} from '@/types/dnd';
import {
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  _dnd_list_item_height,
  _max_boundary,
  _min_boundary,
} from '@/constants';
import { Gesture } from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';

interface DNDListItemProps {
  item: DragAndDropListDataItem;
  currentItemPosition: SharedValue<UpdatedDragAndDropListDataItem>;
  isDragging: SharedValue<0 | 1>;
  draggedItemId: SharedValue<number | null>;
}

const useDNDGestureHandler = ({
  item,
  currentItemPosition,
  draggedItemId,
  isDragging,
}: DNDListItemProps) => {
  const top = useSharedValue(+item.id * _dnd_list_item_height);

  const currentItemPositionDerived = useDerivedValue(() => {
    return currentItemPosition.value;
  });

  const isDraggingDerived = useDerivedValue(() => {
    return isDragging.value;
  });

  const draggedItemIdDerived = useDerivedValue(() => {
    return draggedItemId.value;
  });

  const isCurrentDraggingItem = useDerivedValue(() => {
    return isDraggingDerived.value && draggedItemIdDerived.value === +item.id;
  });

  const newIndex = useSharedValue<NullableNumber>(null);
  const currentIndex = useSharedValue<NullableNumber>(null);

  const getKeyOfValue = (
    value: number,
    obj: UpdatedDragAndDropListDataItem
  ): number | undefined => {
    'worklet';

    for (const [key, val] of Object.entries(obj)) {
      if (val.updatedIndex === value) {
        return +key;
      }
    }
  };

  const gesture = Gesture.Pan()
    .onStart(() => {
      isDragging.value = withSpring(1);
      draggedItemId.value = +item.id;

      currentIndex.value =
        currentItemPositionDerived.value[+item.id].updatedIndex;
    })
    .onUpdate((event) => {
      // TODO Debug
      if (draggedItemIdDerived.value === null) {
        return;
      }

      const newTop =
        currentItemPositionDerived.value[draggedItemIdDerived.value]
          .updatedTop + event.translationY;

      if (
        currentIndex.value === null ||
        newTop < _min_boundary ||
        newTop > _max_boundary
      ) {
        return;
      }

      top.value = newTop;

      newIndex.value = Math.floor(
        (newTop + _dnd_list_item_height / 2) / _dnd_list_item_height
      );

      if (newIndex.value !== currentIndex.value) {
        const newIndexItemKey = getKeyOfValue(
          newIndex.value,
          currentItemPositionDerived.value
        );

        const currentDragIndexItemKey = getKeyOfValue(
          currentIndex.value,
          currentItemPositionDerived.value
        );

        if (
          newIndexItemKey !== undefined &&
          currentDragIndexItemKey !== undefined
        ) {
          currentItemPosition.value = {
            ...currentItemPositionDerived.value,
            [newIndexItemKey]: {
              ...currentItemPositionDerived.value[newIndexItemKey],
              updatedIndex: currentIndex.value,
              updatedTop: currentIndex.value * _dnd_list_item_height,
            },
            [currentDragIndexItemKey]: {
              ...currentItemPositionDerived.value[currentDragIndexItemKey],
              updatedIndex: newIndex.value,
            },
          };
          currentIndex.value = newIndex.value;
        }
      }
    })
    .onEnd(() => {
      if (currentIndex.value === null || newIndex.value === null) {
        return;
      }
      top.value = newIndex.value * _dnd_list_item_height;

      const currentDragIndexItemKey = getKeyOfValue(
        currentIndex.value,
        currentItemPositionDerived.value
      );
      if (currentDragIndexItemKey !== undefined) {
        currentItemPosition.value = {
          ...currentItemPositionDerived.value,
          [currentDragIndexItemKey]: {
            ...currentItemPositionDerived.value[currentDragIndexItemKey],
            updatedTop: newIndex.value + _dnd_list_item_height,
          },
        };
      }

      isDragging.value = 0;
    });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      top: withTiming(top.value, { duration: 20 }),
      transform: [
        {
          scale: isCurrentDraggingItem.value
            ? interpolate(isDraggingDerived.value, [0, 1], [1, 1.025])
            : interpolate(isDraggingDerived.value, [0, 1], [1, 0.98]),
        },
      ],
      backgroundColor: isCurrentDraggingItem.value
        ? interpolateColor(
            isDraggingDerived.value,
            [0, 1],
            [Colors.light.background, 'white']
          )
        : Colors.light.background,
      shadowColor: isCurrentDraggingItem.value
        ? interpolateColor(
            isDraggingDerived.value,
            [0, 1],
            [Colors.light.background, Colors.light.text]
          )
        : undefined,
      shadowOffset: {
        width: 0,
        height: isCurrentDraggingItem.value
          ? interpolate(isDraggingDerived.value, [0, 1], [0, 7])
          : 0,
      },
      shadowOpacity: isCurrentDraggingItem.value
        ? interpolate(isDraggingDerived.value, [0, 1], [0, 0.2])
        : 0,
      shadowRadius: isCurrentDraggingItem.value
        ? interpolate(isDraggingDerived.value, [0, 1], [0, 10])
        : 0,
      elevation: isCurrentDraggingItem.value
        ? interpolate(isDraggingDerived.value, [0, 1], [0, 5])
        : 0,
      zIndex: isCurrentDraggingItem.value ? 1 : 0,
    };
  }, [draggedItemIdDerived.value, isDraggingDerived.value]);

  useAnimatedReaction(
    () => {
      // console.log(
      //   'currentItemPositionDerived.value[+item.id].updatedIndex',
      //   currentItemPositionDerived.value[+item.id].updatedIndex
      // );

      return currentItemPositionDerived.value[+item.id].updatedIndex;
    },
    (currentValue, previousValue) => {
      if (currentValue !== previousValue) {
        if (
          draggedItemIdDerived.value !== null &&
          +item.id === draggedItemIdDerived.value
        ) {
          top.value =
            currentItemPositionDerived.value[+item.id].updatedIndex *
            _dnd_list_item_height;
        } else {
          top.value =
            currentItemPositionDerived.value[+item.id].updatedIndex *
            _dnd_list_item_height;
        }
      }
    },
    []
  );

  return {
    animatedStyles,
    currentItemPositionDerived,
    isDraggingDerived,
    draggedItemIdDerived,
    isCurrentDraggingItem,
    gesture,
  };
};

export default useDNDGestureHandler;
