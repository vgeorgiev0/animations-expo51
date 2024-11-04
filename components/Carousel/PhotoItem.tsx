import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Photo } from '@/types/carousel';
import { _imageHeight, _imageWidth } from '@/constants';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface PhotoProps {
  item: Photo;
  index: number;
  scrollX: SharedValue<number>;
}

const PhotoItem: React.FC<PhotoProps> = ({ item, index, scrollX }) => {
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: 1,
      transform: [
        {
          scale: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [1.6, 1, 1.6]
          ),
        },
        {
          rotate: `${interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [15, 0, -15]
          )}deg`,
        },
      ],
    };
  });

  return (
    <View
      style={[
        { width: _imageWidth, height: _imageHeight },
        styles.imageContainer,
      ]}
    >
      <Animated.Image
        style={[styles.image, animatedStyles]}
        source={{ uri: item.src.large }}
      />
    </View>
  );
};

export default PhotoItem;

const styles = StyleSheet.create({
  imageContainer: {
    overflow: 'hidden',
    borderRadius: 16,
  },
  image: {
    flex: 1,
  },
});
