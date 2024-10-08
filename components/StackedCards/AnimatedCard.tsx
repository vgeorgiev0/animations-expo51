import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface AnimatedCardProps {
  index: number;
  progress: SharedValue<number>;
}

const cardValues = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
];

const AnimatedCard: React.FC<AnimatedCardProps> = ({ index, progress }) => {
  const animatedStyles = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [0, index * 40]);
    const translateY = interpolate(progress.value, [0, 1], [0, -index * 7]);
    const rotate = interpolate(
      progress.value,
      [0, 1],
      [-index * 5, index * 15]
    );

    return {
      transform: [{ translateX }, { translateY }, { rotate: `${rotate}deg` }],
    };
  }, []);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          zIndex: -index,
        },
        animatedStyles,
      ]}
    >
      <Text style={styles.cardText}>{cardValues[index]}❤️</Text>
    </Animated.View>
  );
};

export default AnimatedCard;

const styles = StyleSheet.create({
  card: {
    height: 200,
    aspectRatio: 3 / 4,
    backgroundColor: 'white',
    borderRadius: 25,
    borderCurve: 'continuous',
    shadowColor: '#cccccc',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#b9b9b9',
    position: 'absolute',
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
