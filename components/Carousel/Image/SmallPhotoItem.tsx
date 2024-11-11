import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Photo } from '@/types/carousel';
import Animated, {
  FadeInLeft,
  FadeInRight,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { _imageListSpacing, _smallImageSize } from '@/constants';
import { MotiImage } from 'moti';

interface SmallPhotoItemProps {
  item: Photo;
  index: number;
  onPress: (index: number) => void;
  activeImageIndex: number;
  scrollX: SharedValue<number>;
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const SmallPhotoItem: React.FC<SmallPhotoItemProps> = ({
  index,
  item,
  activeImageIndex,
  scrollX,
  onPress,
}) => {
  const animatedStyles = useAnimatedStyle(() => {
    return {};
  });

  return (
    <AnimatedTouchableOpacity
      onPress={() => {
        if (activeImageIndex === index) {
          return;
        }
        onPress(index);
      }}
      style={[
        styles.smallImage,
        activeImageIndex === index && styles.selectedImage,
      ]}
      entering={FadeInRight.delay(200 * index)
        .damping(80)
        .stiffness(200)}
      exiting={FadeInLeft.delay(200 * index)
        .damping(80)
        .stiffness(200)}
    >
      <MotiImage
        source={{ uri: item.src.tiny }}
        style={[{ flex: 1 }]}
        animate={{
          scale: index === activeImageIndex ? 1.6 : 1,
        }}
      />
    </AnimatedTouchableOpacity>
  );
};

export default SmallPhotoItem;

const styles = StyleSheet.create({
  smallImage: {
    width: _smallImageSize,
    height: _smallImageSize,
    borderRadius: 4,
    marginRight: _imageListSpacing,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'white',
  },
  selectedImage: {
    borderColor: 'tomato',
  },
});
