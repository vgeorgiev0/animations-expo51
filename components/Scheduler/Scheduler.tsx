import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { _spacing, weekDays } from './constants';
import Day from './Day';

interface SchedulerProps {}

const Scheduler: React.FC<SchedulerProps> = ({}) => {
  return (
    <View style={styles.container}>
      {weekDays.map((day) => (
        <Day key={day} day={day} />
      ))}
    </View>
  );
};

export default Scheduler;

const styles = StyleSheet.create({
  container: {
    padding: _spacing,
    gap: _spacing,
  },
});
