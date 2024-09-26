import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TickerList from '@/components/Ticker/TickerList';

interface TickerProps {
  value: number;
}

const Ticker: React.FC<TickerProps> = ({ value = 12345 }) => {
  const splittedValue = value.toString().split('');
  return (
    <View>
      <View style={styles.innerContainer}>
        {splittedValue.map((number, index) => {
          return (
            <TickerList
              index={index}
              number={number}
              key={`tick-item-${number}-index-${index}`}
            />
          );
        })}
      </View>
    </View>
  );
};

// TODO continue https://www.youtube.com/watch?v=Rv91NdVtnsw&t=29s 6:28
export default Ticker;

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
