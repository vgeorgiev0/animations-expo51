import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/FromTemplate/useColorScheme';
import MotiIcon from '@/components/TopTabs/MotiIcon';
import { MotiView } from 'moti';
import { LinearTransition } from 'react-native-reanimated';
import TabBar from '@/components/TabBar/TabBar';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: false,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => {
            return (
              <MotiView
                layout={LinearTransition.springify().damping(80).stiffness(200)}
              >
                <MotiIcon
                  size={22}
                  name='AirVent'
                  animate={{
                    scale: focused ? 1 : 0.9,
                  }}
                />
              </MotiView>
            );
          },
        }}
      />
      <Tabs.Screen
        name='drawer'
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => {
            return (
              <MotiView
                layout={LinearTransition.springify().damping(80).stiffness(200)}
              >
                <MotiIcon
                  size={22}
                  name='AppWindowMac'
                  animate={{
                    scale: focused ? 1 : 0.9,
                  }}
                />
              </MotiView>
            );
          },
        }}
      />
    </Tabs>
  );
}
