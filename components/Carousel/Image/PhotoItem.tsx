import { StyleSheet, View } from 'react-native';
import React from 'react';
import { CarouselImageVariant, Photo } from '@/types/carousel';
import { _imageHeight, _imageWidth } from '@/constants';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import ZoomImage from './ZoomImage';

interface PhotoProps {
  item: Photo;
  index: number;
  scrollX: SharedValue<number>;
  imageWidth?: number;
  variant?: CarouselImageVariant;
  zoomable?: boolean;
}

const PhotoItem: React.FC<PhotoProps> = ({
  item,
  index,
  scrollX,
  imageWidth = _imageWidth,
  variant = CarouselImageVariant.ROUNDED,
  zoomable,
}) => {
  const animatedStyles = useAnimatedStyle(() => {
    return {
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
        { width: imageWidth, height: _imageHeight },
        styles.imageContainer,
        variant === CarouselImageVariant.ROUNDED && styles.rounded,
      ]}
    >
      {zoomable ? (
        <ZoomImage
          style={[
            animatedStyles,
            { height: _imageHeight },
            variant === CarouselImageVariant.ROUNDED && styles.rounded,
          ]}
          // resizeMode={'cover'}
          item={item}
        />
      ) : (
        <Animated.Image
          style={[styles.image, animatedStyles]}
          source={{ uri: item.src.original }}
        />
      )}
    </View>
  );
};

export default PhotoItem;

const styles = StyleSheet.create({
  imageContainer: {
    overflow: 'hidden',
  },
  rounded: {
    borderRadius: 16,
  },
  image: {
    flex: 1,
  },
});
