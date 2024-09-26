import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { User } from '.';
import Animated, {
  FadeInRight,
  interpolate,
  interpolateColor,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';

interface PlaceProps {
  user: User;
  index: number;
  onFinish?: () => void;
  animationValue: SharedValue<number>;
  highestScoreIndex: number;
}
const _avatarSize = 28;
const _spacing = 4;
const _stagger = 200;

const Place: React.FC<PlaceProps> = ({
  user,
  index,
  onFinish,
  animationValue,
  highestScoreIndex,
}) => {
  const { name, score } = user;

  const derivedAnimationValue = useDerivedValue(() => {
    return withDelay(
      _stagger * index,
      withSpring(animationValue?.value, {
        damping: 80,
        stiffness: 200,
      })
    );
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      // height: user.score * 3 * derivedAnimationValue.value,
      height: interpolate(
        derivedAnimationValue.value,
        [0, 1],
        [_avatarSize, Math.max(user.score * 3, _avatarSize + _spacing)]
      ),
      backgroundColor:
        index === highestScoreIndex
          ? interpolateColor(
              derivedAnimationValue.value,
              [0, 1],
              ['rgba(0,0,0,0.3)', 'turquoise']
            )
          : 'rgba(0,0,0,0.3)',
    };
  });
  const animatedTextStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(derivedAnimationValue.value, [0, 0.2, 1], [0, 0, 1]),
    };
  });

  return (
    <Animated.View
      entering={FadeInRight.delay(_stagger * index)
        .damping(80)
        .stiffness(200)
        .withCallback((finished) => {
          if (finished && onFinish) {
            runOnJS(onFinish)();
          }
        })}
      style={styles.container}
    >
      <Animated.Text style={[styles.score, animatedTextStyles]}>
        {score}
      </Animated.Text>
      <Animated.View
        style={[
          {
            height: _avatarSize,
            borderRadius: _avatarSize,
          },
          animatedStyles,
        ]}
      >
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{ uri: `https://i.pravatar.cc/50?u=user_${name}` }}
          />
        </View>
      </Animated.View>
    </Animated.View>
  );
};

export default Place;

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    alignItems: 'center',
  },
  score: {
    fontSize: 7,
    fontWeight: '700',
  },
  avatar: {
    flex: 1,
    borderRadius: _avatarSize,
    aspectRatio: 1,
  },
  avatarContainer: {
    width: _avatarSize,
    aspectRatio: 1,
  },
  innerContainer: {
    flexDirection: 'row',
    gap: _spacing,
  },
});
