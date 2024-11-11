import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import WithZoom from '@/components/Carousel/WithZoom';

interface PinchZoomScreenProps {}

const PinchZoomScreen: React.FC<PinchZoomScreenProps> = ({}) => {
  return (
    <View style={styles.container}>
      <WithZoom />
    </View>
  );
};

export default PinchZoomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
