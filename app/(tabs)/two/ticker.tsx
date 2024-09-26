import { Button, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';

import Ticker from '@/components/Ticker';

const TickerScreen = () => {
  const [value, setValue] = useState(12345);
  return (
    <View style={[styles.container]}>
      <Ticker value={value} isCurrency />
      <Button
        title='random value'
        onPress={() =>
          setValue(Math.floor(Math.random() * 100000000000) + 0.99)
        }
      />
    </View>
  );
};

export default TickerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
