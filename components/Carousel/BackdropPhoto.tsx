import { StyleSheet } from 'react-native';
import React from 'react';
import { Photo } from '@/types/carousel';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface BackdropPhotoProps {
  photo: Photo;
  index: number;
  scrollX: SharedValue<number>;
}

const BackdropPhoto: React.FC<BackdropPhotoProps> = ({
  index,
  photo,
  scrollX,
}) => {
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        [index - 1, index, index + 1],
        [0, 1, 0]
      ),
    };
  });

  return (
    <Animated.Image
      style={[styles.image, animatedStyles]}
      source={{ uri: photo.src.large }}
      blurRadius={30}
    />
  );
};

export default BackdropPhoto;

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
  },
});
