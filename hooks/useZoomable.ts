import { UseZoomableProps } from '@/types';
import { useZoomableHandle } from './useZoomableHandle';
import { useZoomableLayout } from './useZoomableLayout';
import { useGestures } from './useGestures';

export const useZoomable = ({
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
}: UseZoomableProps) => {
  const { width, height, center, onZoomableLayout } = useZoomableLayout({
    onLayout,
  });
  const { animatedStyle, gestures, reset, zoom } = useGestures({
    width,
    height,
    center,
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
  });
  useZoomableHandle(ref, reset, zoom);

  return { animatedStyle, gestures, onZoomableLayout };
};
