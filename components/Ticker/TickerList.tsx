import { StyleSheet } from 'react-native';
import React from 'react';
import Tick from './Tick';
import { View } from '../Themed';
import { MotiView } from 'moti';

interface TickerListProps {
  number: number;
  index: number;
  fontSize: number;
}
const numbers = [...Array(10).keys()];

const _stagger = 50;

const TickerList: React.FC<TickerListProps> = ({ number, index, fontSize }) => {
  return (
    <View style={[styles.container, { height: fontSize }]}>
      <MotiView
        animate={{
          transform: [{ translateY: Math.floor(-fontSize * 1.1 * number) }],
        }}
        transition={{
          delay: index * _stagger,
          damping: 80,
          stiffness: 200,
        }}
      >
        {numbers.map((num, index) => {
          return (
            <Tick fontSize={fontSize} key={`tick-${index}-${num}`}>
              {num}
            </Tick>
          );
        })}
      </MotiView>
    </View>
  );
};

export default TickerList;

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  container: {
    overflow: 'hidden',
  },
});
