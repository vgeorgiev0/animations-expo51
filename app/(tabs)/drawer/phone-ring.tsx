import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PhoneRing from '@/components/PhoneRing';

interface PhoneRingScreenProps {}

const PhoneRingScreen: React.FC<PhoneRingScreenProps> = ({}) => {
  return (
    <View style={styles.container}>
      <PhoneRing />
    </View>
  );
};

export default PhoneRingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
