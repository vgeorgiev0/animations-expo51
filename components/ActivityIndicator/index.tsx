import { StyleSheet } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import {
  BlurMask,
  Canvas,
  Path,
  Skia,
  SweepGradient,
  vec,
} from '@shopify/react-native-skia';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface ActivityIndicatorProps {
  loading: boolean;
}

const CanvasSize = 120;
const HalvedCanvasSize = CanvasSize / 2;
const CircleSize = 64;
const StrokeWidth = 10;
const CircleRadius = (CircleSize - StrokeWidth) / 2;

const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({ loading }) => {
  const circlePath = useMemo(() => {
    const skPath = Skia.Path.Make();
    skPath.addCircle(HalvedCanvasSize, HalvedCanvasSize, CircleRadius);
    return skPath;
  }, []);

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 1200, easing: Easing.linear }),
      -1
    );
  }, []);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${progress.value * 2 * Math.PI}rad` }],
    };
  });

  const startAnimated = useDerivedValue(() => {
    return interpolate(progress.value, [0, 0.5, 1], [0.3, 0.6, 0.3]);
  }, []);

  if (!loading) {
    return null;
  }

  return (
    <Animated.View style={rStyle}>
      <Canvas style={styles.canvasStyle}>
        <Path
          path={circlePath}
          color={'white'}
          style={'stroke'}
          strokeWidth={StrokeWidth}
          strokeCap={'round'}
          start={startAnimated}
          end={1}
        >
          <SweepGradient
            c={vec(HalvedCanvasSize, HalvedCanvasSize)}
            colors={['cyan', 'magenta', 'yellow', 'cyan']}
          />
          <BlurMask blur={5} style={'solid'} />
        </Path>
      </Canvas>
    </Animated.View>
  );
};

export default ActivityIndicator;

const styles = StyleSheet.create({
  canvasStyle: {
    width: CanvasSize,
    height: CanvasSize,
  },
});
