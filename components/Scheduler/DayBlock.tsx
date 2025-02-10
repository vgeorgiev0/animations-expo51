import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import {
  _borderRadius,
  _color,
  _entering,
  _exiting,
  _layout,
  _spacing,
  _startHour,
} from './constants';
import { Plus, X } from 'lucide-react-native';
import HourBlock from './HourBlock';
import Animated from 'react-native-reanimated';

interface DayBlockProps {}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const DayBlock: React.FC<DayBlockProps> = ({}) => {
  const [hours, setHours] = useState([_startHour]);
  const handlePress = () => {
    if (hours.length === 0) {
      setHours([_startHour]);
      return;
    }
    setHours((prev) => [...prev, prev[prev.length - 1] + 1]);
  };

  return (
    <Animated.View
      entering={_entering}
      exiting={_exiting}
      layout={_layout}
      style={styles.container}
    >
      {hours.map((hour) => (
        <Animated.View
          entering={_entering}
          exiting={_exiting}
          layout={_layout}
          style={styles.hourContainer}
          key={`hour-${hour}`}
        >
          <Text>From:</Text>
          <HourBlock block={hour} />
          <Text>To</Text>
          <HourBlock block={hour + 1} />
          <Pressable
            onPress={() => {
              console.log('Remove hour: ', hour, 'DayBlock.tsx 🚀');
              setHours((prev) => prev.filter((h) => h !== hour));
            }}
          >
            <View style={styles.removeHourButtonContainer}>
              <X size={14} color='#555' />
            </View>
          </Pressable>
        </Animated.View>
      ))}
      <AnimatedPressable layout={_layout} onPress={handlePress}>
        <View style={styles.innerContainer}>
          <Plus size={18} color='#333' />
          <Text style={styles.addMoreText}>Add more</Text>
        </View>
      </AnimatedPressable>
    </Animated.View>
  );
};

export default DayBlock;

const styles = StyleSheet.create({
  container: {
    gap: _spacing,
  },
  innerContainer: {
    flexDirection: 'row',
    gap: _spacing / 2,
    padding: _spacing,
    borderRadius: _borderRadius - _spacing / 2,
    backgroundColor: _color,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: _spacing / 2,
  },
  addMoreText: {
    color: '#333',
    fontSize: 14,
  },
  hourContainer: {
    flexDirection: 'row',
    gap: _spacing,
    alignItems: 'center',
  },
  removeHourButtonContainer: {
    backgroundColor: _color,
    height: 24,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: _borderRadius - _spacing,
  },
});
