import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PexelsWallpapers from '@/components/Carousel/PexelsWallpapers';

interface CarouselProps {}

const Carousel: React.FC<CarouselProps> = ({}) => {
  return (
    <View style={styles.container}>
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
