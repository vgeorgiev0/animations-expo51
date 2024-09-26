import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Tabs, { TabItem } from '@/components/TopTabs/Tabs';
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeOutRight,
  LayoutAnimationConfig,
} from 'react-native-reanimated';

interface MotiProps {}

const tabData: TabItem[] = [
  { icon: 'LifeBuoy', label: 'Buoy' },
  { icon: 'Fish', label: 'Fresh fish' },
  { icon: 'Sailboat', label: 'Sail' },
  { icon: 'Ship', label: 'Ship it' },
  { icon: 'ShipWheel', label: 'Manage it' },
];

const tabs = ['#FF005C', '#FFBD00', '#00B3E6', '#00CC96', '#FF03DC'];

const Moti: React.FC<MotiProps> = ({}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <View style={styles.container}>
      <Tabs
        data={tabData}
        selectedIndex={selectedIndex}
        onChange={(index) => setSelectedIndex(index)}
      />
      <LayoutAnimationConfig skipEntering>
        <Animated.View
          key={`tab-content-${selectedIndex}`}
          entering={FadeInRight.springify().damping(80).stiffness(200)}
          exiting={FadeOutRight.springify().damping(80).stiffness(200)}
          style={[styles.content, { backgroundColor: tabs[selectedIndex] }]}
        />
      </LayoutAnimationConfig>
    </View>
  );
};

export default Moti;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    gap: 8,
  },
  content: {
    flex: 1,
    borderRadius: 8,
  },
});
