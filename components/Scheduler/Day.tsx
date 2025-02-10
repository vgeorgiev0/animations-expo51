import React, { useState } from 'react';
import {
  _borderRadius,
  _color,
  _layout,
  _spacing,
  weekDays,
} from './constants';
import { StyleSheet, Switch, Text, View } from 'react-native';
import DayBlock from './DayBlock';
import Animated from 'react-native-reanimated';

interface DayProps {
  day: (typeof weekDays)[number];
}

const Day: React.FC<DayProps> = ({ day }) => {
  const [isOn, setIsOn] = useState(false);
  return (
    <Animated.View layout={_layout} style={[styles.container]}>
      <View style={styles.innerContainer}>
        <Text>{day}</Text>
        <Switch
          style={styles.switch}
          value={isOn}
          onValueChange={setIsOn}
          trackColor={{ true: '#636363' }}
        />
      </View>
      {isOn ? <DayBlock /> : null}
    </Animated.View>
  );
};

export default Day;

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switch: {
    transform: [{ scale: 0.7 }],
    transformOrigin: ['100%', '50%', 0],
  },
  container: {
    borderWidth: 1,
    borderColor: _color,
    borderRadius: _borderRadius,
    padding: _spacing,
  },
});
