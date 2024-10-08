import { StyleSheet, View } from 'react-native';
import React from 'react';
import Animated, {
  interpolate,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import AnimatedCard from './AnimatedCard';

interface StackedCardsProps {}

const StackedCards: React.FC<StackedCardsProps> = ({}) => {
  const progress = useSharedValue(0);

  return (
    <View
      style={styles.container}
      onTouchStart={() => {
        progress.value = withSpring(1, {
          damping: 10,
          stiffness: 100,
        });
      }}
      onTouchEnd={() => {
        progress.value = withSpring(0, {
          damping: 10,
          stiffness: 100,
        });
      }}
    >
      {new Array(4).fill(null).map((_, index) => {
        return <AnimatedCard key={index} index={index} progress={progress} />;
      })}
    </View>
  );
};

export default StackedCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3e3e3',
  },
});
