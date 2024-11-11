import React, { useRef, useState } from 'react';
import ImageZoom from './ImageZoom';
import { height, width } from '@/constants';
import {
  FadeIn,
  FadeOut,
  LinearTransition,
  useSharedValue,
} from 'react-native-reanimated';
import { ImageZoomProps, ImageZoomRef, ZOOM_TYPE } from '@/types';
import { Photo } from '@/types/carousel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ZoomImageProps {
  minScale?: number;
  maxScale?: number;
  style?: ImageZoomProps['style'];
  item: Photo;
}

const ZoomImage: React.FC<ZoomImageProps> = ({
  minScale,
  item,
  maxScale,
  style,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const ref = useRef<ImageZoomRef>(null);
  const scale = useSharedValue(1);
  const { top } = useSafeAreaInsets();

  const onZoom = (zoomType?: ZOOM_TYPE) => {
    if (!zoomType || zoomType === ZOOM_TYPE.ZOOM_IN) {
      setIsZoomed(true);
    }
  };

  const onAnimationEnd = (finished?: boolean) => {
    if (finished) {
      setIsZoomed(false);
    }
  };
  return (
    <ImageZoom
      entering={FadeIn}
      exiting={FadeOut}
      layout={LinearTransition}
      ref={ref}
      uri={item.src.original}
      scale={scale}
      minScale={minScale}
      maxScale={maxScale}
      doubleTapScale={3}
      isSingleTapEnabled
      isDoubleTapEnabled
      onInteractionStart={() => {
        onZoom();
      }}
      onInteractionEnd={() => {
        ref.current?.reset();
      }}
      // onPanStart={() => console.log('onPanStart')}
      // onPanEnd={() => console.log('onPanEnd')}
      // onPinchStart={() => console.log('onPinchStart')}
      // onPinchEnd={() => console.log('onPinchEnd')}
      // onSingleTap={() => console.log('onSingleTap')}
      onDoubleTap={(zoomType) => {
        onZoom(zoomType);
      }}
      onProgrammaticZoom={(zoomType) => {
        onZoom(zoomType);
      }}
      style={[{ width, height: height - (top * 2 + 64) }, style]}
      onResetAnimationEnd={(finished, values) => {
        onAnimationEnd(finished);
      }}
      resizeMode='contain'
    />
  );
};

export default ZoomImage;
