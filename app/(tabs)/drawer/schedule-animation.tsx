import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import Scheduler from '@/components/Scheduler/Scheduler';

interface ScheduleAnimationsScreenProps {}

const ScheduleAnimationsScreen: React.FC<
  ScheduleAnimationsScreenProps
> = ({}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Scheduler />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScheduleAnimationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
