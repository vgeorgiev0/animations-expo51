import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  UIManager,
  LayoutAnimation,
  StyleSheet,
} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import SwipeableItem, {
  useSwipeableItemParams,
} from 'react-native-swipeable-item';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { FlatList } from 'react-native-gesture-handler';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const NUM_ITEMS = 10;
const OVERSWIPE_DIST = 20;

function getColor(i: number) {
  const multiplier = 255 / (NUM_ITEMS - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}

const exampleData: Item[] = [...Array(20)].map((d, index) => {
  const backgroundColor = getColor(index);
  return {
    key: `item-${backgroundColor}`,
    label: String(index),
    backgroundColor,
  };
});

type Item = {
  key: string;
  label?: string;
  backgroundColor?: string;
  height?: number;
};

function Example() {
  const [data, setData] = useState(exampleData);
  const itemRefs = useRef(new Map());

  const renderItem = useCallback((params: RenderItemParams<Item>) => {
    const onPressDelete = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setData((prev) => {
        return prev.filter((item) => item !== params.item);
      });
    };

    return (
      <RowItem {...params} itemRefs={itemRefs} onPressDelete={onPressDelete} />
    );
  }, []);

  const topListRef = useRef<FlatList<Item>>(null);

  return (
    <View style={{ flex: 1 }}>
      <DraggableFlatList
        ref={topListRef}
        renderPlaceholder={({ index, item }) => {
          return (
            <View
              style={{
                backgroundColor: item.backgroundColor,
                height: item.height,
                marginVertical: 1,
              }}
            >
              <Text>{item.label}</Text>
            </View>
          );
        }}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${item.key}`}
        onDragEnd={({ data }) => {
          setData(data);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }}
        activationDistance={20}
      />
    </View>
  );
}

export default Example;

type RowItemProps = {
  item: Item;
  drag: () => void;
  onPressDelete: () => void;
  itemRefs: React.MutableRefObject<Map<any, any>>;
};

function RowItem({ item, itemRefs, drag, onPressDelete }: RowItemProps) {
  const [snapPointsLeft, setSnapPointsLeft] = useState([150]);

  return (
    <ScaleDecorator activeScale={0.9}>
      <SwipeableItem
        key={item.key}
        item={item}
        ref={(ref) => {
          if (ref && !itemRefs.current.get(item.key)) {
            itemRefs.current.set(item.key, ref);
          }
        }}
        onChange={({ openDirection }) => {
          if (openDirection) {
            // Close all other open items
            [...itemRefs.current.entries()].forEach(([key, ref]) => {
              if (key !== item.key && ref) ref.close();
            });
          }
        }}
        overSwipe={OVERSWIPE_DIST}
        renderUnderlayLeft={() => (
          <UnderlayLeft drag={drag} onPressDelete={onPressDelete} />
        )}
        renderUnderlayRight={() => <UnderlayRight />}
        snapPointsLeft={snapPointsLeft}
      >
        <TouchableOpacity
          activeOpacity={1}
          delayLongPress={100}
          onLongPress={() => {
            drag();
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            [...itemRefs.current.entries()].forEach(([key, ref]) => {
              if (key !== item.key && ref) ref.close();
            });
          }}
          style={[
            styles.row,
            {
              backgroundColor: 'white',
              height: item.height,
              marginVertical: 1,
            },
          ]}
        >
          <Text style={styles.text}>{`${item.label}`}</Text>
        </TouchableOpacity>
      </SwipeableItem>
    </ScaleDecorator>
  );
}

const UnderlayLeft = ({
  drag,
  onPressDelete,
}: {
  drag: () => void;
  onPressDelete: () => void;
}) => {
  const { item, percentOpen } = useSwipeableItemParams<Item>();
  const animStyle = useAnimatedStyle(
    () => ({
      opacity: percentOpen.value,
    }),
    [percentOpen]
  );

  return (
    <Animated.View
      style={[styles.row, styles.underlayLeft, animStyle]} // Fade in on open
    >
      <TouchableOpacity onPress={onPressDelete}>
        <Text style={styles.text}>{`[delete]`}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

function UnderlayRight() {
  const { close } = useSwipeableItemParams<Item>();
  return (
    <Animated.View style={[styles.row, styles.underlayRight]}>
      <TouchableOpacity onPressOut={() => close()}>
        <Text style={styles.text}>CLOSE</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  text: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 32,
  },
  underlayRight: {
    flex: 1,
    backgroundColor: 'teal',
    justifyContent: 'flex-start',
  },
  underlayLeft: {
    flex: 1,
    backgroundColor: 'tomato',
    justifyContent: 'flex-end',
  },
});
