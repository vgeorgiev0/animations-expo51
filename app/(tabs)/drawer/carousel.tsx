import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PexelsWallpapers from '@/components/Carousel/PexelsWallpapers';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { _spacing } from '@/constants';
import { DrawerToggleButton } from '@react-navigation/drawer';

interface CarouselProps {}

const Carousel: React.FC<CarouselProps> = ({}) => {
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
      <PexelsWallpapers />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
