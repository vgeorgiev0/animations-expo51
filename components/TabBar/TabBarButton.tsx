import { Pressable, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { IconFamily, TabBarIcon } from './TabBarIcon';

interface TabBarButtonProps {
  routeName: any;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  label: any;
  color: string;
}
interface IconProps {
  focused: boolean;
  color: string;
  size: number;
}

const TabBarButton: React.FC<TabBarButtonProps> = ({
  routeName,
  isFocused,
  label,
  onLongPress,
  onPress,
  color,
}) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused,
      {
        duration: 350,
        stiffness: 100,
      }
    );
  }, [isFocused, scale]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.3]);
    const top = interpolate(scale.value, [0, 1], [0, 9]);
    // const backgroundColor = interpolateColor(
    //   scale.value,
    //   [0, 1],
    //   ['white', Colors.GREEN]
    // );
    const borderRadius = interpolate(scale.value, [0, 1], [0, 26]);

    return {
      transform: [{ scale: scaleValue }],
      top,
      // backgroundColor,
      borderRadius,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    return {
      opacity,
    };
  });

  const icon: {
    [key: string]: ({ color, focused, size }: IconProps) => JSX.Element;
  } = {
    index: ({ color, focused, size }: IconProps) => (
      <Feather
        name='home'
        size={24}
        style={{ paddingRight: 5 }}
        color={isFocused ? 'white' : 'black'}
      />
    ),
    drawer: ({ color, focused, size }: IconProps) => (
      <Feather name='star' size={24} color={isFocused ? 'white' : 'black'} />
    ),
    profile: ({ color, focused, size }: IconProps) => (
      <Feather name='user' size={24} color={isFocused ? 'white' : 'black'} />
    ),
  };
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabBarItem}
    >
      <Animated.View style={animatedIconStyle}>
        {icon[routeName]?.({
          focused: isFocused,
          color: isFocused ? 'white' : 'black',
          size: 24,
        })}
      </Animated.View>

      <Animated.Text
        style={[{ color: isFocused ? 'white' : 'black' }, animatedTextStyle]}
      >
        {typeof label === 'function'
          ? label({
              focused: isFocused,
              color: isFocused ? 'white' : 'black',
              position: 'below-icon',
              children: '',
            })
          : label}
      </Animated.Text>
    </Pressable>
  );
};

export default TabBarButton;
const styles = StyleSheet.create({
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    fontSize: 14,
  },
});
