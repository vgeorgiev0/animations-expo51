import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { icons } from 'lucide-react-native';
import MotiIcon from './MotiIcon';
import Animated, {
  FadeInRight,
  FadeOutRight,
  LayoutAnimationConfig,
  LinearTransition,
} from 'react-native-reanimated';
import { MotiView } from 'moti';

const _spacing = 4;

export type IconNames = keyof typeof icons;

export interface TabItem {
  icon: IconNames;
  label: string;
}

interface TabsProps {
  data: TabItem[];
  selectedIndex: number;
  onChange: (index: number) => void;
  activeColor?: string;
  inactiveColor?: string;
  activeBackgroundColor?: string;
  inactiveBackgroundColor?: string;
}

const Tabs: React.FC<TabsProps> = ({
  data,
  onChange,
  selectedIndex,
  activeColor = '#fff',
  inactiveColor = '#999',
  activeBackgroundColor = '#111',
  inactiveBackgroundColor = '#ddd',
}) => {
  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        const isSelected = selectedIndex === index;
        return (
          <MotiView
            key={`tab-item-${item.label}-${index}`}
            style={styles.buttonContainer}
            animate={{
              backgroundColor: isSelected
                ? activeBackgroundColor
                : inactiveBackgroundColor,
            }}
            layout={LinearTransition.springify().damping(80).stiffness(200)}
          >
            <Pressable style={styles.button} onPress={() => onChange(index)}>
              <MotiIcon
                animate={{
                  color: isSelected ? activeColor : inactiveColor,
                  rotateY: isSelected ? '180deg' : '0deg',
                  scale: isSelected ? 1 : 0.9,
                }}
                name={item.icon}
              />
              {isSelected && (
                <LayoutAnimationConfig skipEntering>
                  <Animated.Text
                    entering={FadeInRight.springify()
                      .damping(80)
                      .stiffness(200)}
                    exiting={FadeOutRight.springify()
                      .damping(80)
                      .stiffness(200)}
                    style={[
                      {
                        color: isSelected ? activeColor : inactiveColor,
                      },
                    ]}
                  >
                    {item.label}
                  </Animated.Text>
                </LayoutAnimationConfig>
              )}
            </Pressable>
          </MotiView>
        );
      })}
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: _spacing,
  },
  button: {
    padding: _spacing * 3,
    justifyContent: 'center',
    alignItems: 'center',
    gap: _spacing,
    flexDirection: 'row',
  },
  buttonContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
});
