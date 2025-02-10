import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { _borderRadius, _color, _spacing } from './constants';

interface HourBlockProps {
  block: number;
}

const HourBlock: React.FC<HourBlockProps> = ({ block }) => {
  return (
    <View style={styles.container}>
      <Text>
        {block > 9 ? block : `0${block}`}:00{' '}
        {block > 11 && block < 24 ? 'PM' : 'AM'}
      </Text>
    </View>
  );
};

export default HourBlock;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: _color,
    borderRadius: _borderRadius - _spacing,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: _spacing / 4,
  },
});
