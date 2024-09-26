import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Tick from './Tick';

interface TickerListProps {
  number: string;
  index: number;
}
const numbers = [...Array(10).keys()];

const TickerList: React.FC<TickerListProps> = ({ number, index }) => {
  return (
    <View key={`number-${number}-indx-${index}`}>
      {numbers.map((num, index) => {
        return <Tick key={`inner-number-${index}-${num}`}>{num}</Tick>;
      })}
    </View>
  );
};

export default TickerList;

const styles = StyleSheet.create({});
