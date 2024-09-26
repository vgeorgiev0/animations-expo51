import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';

interface PhoneRingProps {}
const _outerColor = '#6E01EF';
const _size = 100;

const PhoneRing: React.FC<PhoneRingProps> = ({}) => {
  return (
    <View style={[styles.dot, styles.center]}>
      {[...Array(3).keys()].map((i) => (
        <MotiView
          from={{
            opacity: 0.7,
            scale: 1,
          }}
          animate={{
            opacity: 0,
            scale: 4,
          }}
          transition={{
            type: 'timing',
            duration: 2000,
            easing: Easing.out(Easing.ease),
            loop: true,
            delay: i * 400,
          }}
          key={i}
          style={[styles.dot, StyleSheet.absoluteFillObject]}
        />
      ))}
      <Feather name='phone-outgoing' size={32} color={'#fff'} />
    </View>
  );
};

export default PhoneRing;

const styles = StyleSheet.create({
  dot: {
    width: _size,
    height: _size,
    borderRadius: _size,
    backgroundColor: _outerColor,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
