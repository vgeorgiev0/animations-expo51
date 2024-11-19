import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import {
  DragAndDropListDataItem,
  ItemStatus,
  NullableNumber,
  UpdatedDragAndDropListDataItem,
} from '@/types/dnd';
import { _dnd_list_item_height } from '@/constants';
import * as Haptics from 'expo-haptics';

import { Ionicons } from '@expo/vector-icons';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import useDNDGestureHandler from '@/hooks/useDNDGestureHandler';
import { GestureDetector } from 'react-native-gesture-handler';

interface DNDListItemProps {
  item: DragAndDropListDataItem;
  index: number;
  isStart: boolean;
  currentItemPosition: SharedValue<UpdatedDragAndDropListDataItem>;
  draggedItemId: SharedValue<NullableNumber>;
  isDragging: SharedValue<0 | 1>;
}

const DNDListItem: React.FC<DNDListItemProps> = ({
  index,
  item,
  isStart,
  currentItemPosition,
  draggedItemId,
  isDragging,
}) => {
  const chartWidth = useSharedValue(isStart ? 0.2 : 0.35);
  const draggerWidth = useSharedValue(isStart ? 0.2 : 0.1);
  const mainWidth = useSharedValue(isStart ? 0.3 : 0.35);

  useEffect(() => {
    chartWidth.value = withTiming(isStart ? 0.2 : 0.35, { duration: 300 });
    draggerWidth.value = withTiming(isStart ? 0.2 : 0, { duration: 300 });
    mainWidth.value = withTiming(isStart ? 0.3 : 0.35, { duration: 300 });
  }, [isStart]);

  const chartStyle = useAnimatedStyle(() => {
    return {
      width: `${chartWidth.value * 100}%`,
    };
  });

  const draggerStyle = useAnimatedStyle(() => {
    return {
      width: `${draggerWidth.value * 100}%`,
      opacity: withTiming(isStart ? 1 : 0, { duration: 300 }),
    };
  });

  const mainStyle = useAnimatedStyle(() => {
    return {
      width: `${mainWidth.value * 100}%`,
    };
  });

  const {
    animatedStyles,
    currentItemPositionDerived,
    draggedItemIdDerived,
    gesture,
    isDraggingDerived,
  } = useDNDGestureHandler({
    item,
    currentItemPosition,
    draggedItemId,
    isDragging,
  });

  return (
    <Animated.View style={[styles.itemContainer, animatedStyles]}>
      <Animated.View style={[styles.innerContainer, mainStyle]}>
        <Text style={styles.title}>{item.title}</Text>
      </Animated.View>
      <Animated.View style={[styles.chartContainer, chartStyle]}>
        <Ionicons
          name={item.status === ItemStatus.UP ? 'trending-up' : 'trending-down'}
          size={_dnd_list_item_height - 50}
          color={item.status === ItemStatus.UP ? 'green' : 'red'}
        />
      </Animated.View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${item.market_price}</Text>
        <Text
          style={[
            styles.gain,
            {
              color: item.status === ItemStatus.UP ? 'green' : 'red',
            },
          ]}
        >
          {' '}
          {item.gain_amount}{' '}
        </Text>
      </View>
      <GestureDetector gesture={gesture}>
        <Animated.View
          onTouchStart={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          }}
          style={[styles.draggerContainer, draggerStyle]}
        >
          <Ionicons
            name='menu-outline'
            size={_dnd_list_item_height - 50}
            color='grey'
          />
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

export default DNDListItem;

const styles = StyleSheet.create({
  itemContainer: {
    height: _dnd_list_item_height,
    flexDirection: 'row',
    position: 'absolute',
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  innerContainer: {
    height: _dnd_list_item_height,
    width: '35%',
    justifyContent: 'flex-start',
    padding: '3%',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  chartContainer: {
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
  },
  priceContainer: {
    width: '30%',
    alignItems: 'flex-end',
    paddingRight: 15,
    justifyContent: 'center',
  },
  price: {
    fontSize: 15,
    marginTop: 5,
  },
  gain: {
    fontSize: 13,
    marginTop: 5,
  },
  draggerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
