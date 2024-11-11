import { useZoomable } from '@/hooks/useZoomable';
import { ImageZoomProps, ImageZoomRef } from '@/types';
import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const ImageZoom: ForwardRefRenderFunction<ImageZoomRef, ImageZoomProps> = (
  {
    uri = '',
    minScale,
    maxScale,
    scale,
    doubleTapScale,
    maxPanPointers,
    isPanEnabled,
    isPinchEnabled,
    isSingleTapEnabled,
    isDoubleTapEnabled,
    onInteractionStart,
    onInteractionEnd,
    onPinchStart,
    onPinchEnd,
    onPanStart,
    onPanEnd,
    onSingleTap,
    onDoubleTap,
    onProgrammaticZoom,
    onResetAnimationEnd,
    onLayout,
    style = {},
    ...props
  },
  ref
) => {
  const { animatedStyle, gestures, onZoomableLayout } = useZoomable({
    minScale,
    maxScale,
    scale,
    doubleTapScale,
    maxPanPointers,
    isPanEnabled,
    isPinchEnabled,
    isSingleTapEnabled,
    isDoubleTapEnabled,
    onInteractionStart,
    onInteractionEnd,
    onPinchStart,
    onPinchEnd,
    onPanStart,
    onPanEnd,
    onSingleTap,
    onDoubleTap,
    onProgrammaticZoom,
    onResetAnimationEnd,
    onLayout,
    ref,
  });

  return (
    <GestureDetector gesture={gestures}>
      <Animated.Image
        style={[style, animatedStyle]}
        source={{ uri }}
        resizeMode='contain'
        onLayout={onZoomableLayout}
        {...props}
      />
    </GestureDetector>
  );
};

export default forwardRef(ImageZoom);
