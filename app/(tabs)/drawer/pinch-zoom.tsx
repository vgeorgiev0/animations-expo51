import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import WithZoom from '@/components/Carousel/WithZoom';
import { _spacing } from '@/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerToggleButton } from '@react-navigation/drawer';

interface PinchZoomScreenProps {}

const PinchZoomScreen: React.FC<PinchZoomScreenProps> = ({}) => {
  const { top, left } = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          top: top + _spacing,
          left: left + _spacing,
        }}
      >
        <DrawerToggleButton />
      </View>
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
