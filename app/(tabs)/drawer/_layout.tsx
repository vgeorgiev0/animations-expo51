import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/FromTemplate/useColorScheme';
import { useClientOnlyValue } from '@/components/FromTemplate/useClientOnlyValue';
import { Drawer } from 'expo-router/drawer';

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
    <Drawer>
      <Drawer.Screen
        name='index' // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'Home',
          title: 'Animations',
        }}
      />
      <Drawer.Screen
        name='moti'
        options={{
          drawerLabel: 'Moti',
          title: 'Moti',
        }}
      />
      <Drawer.Screen
        name='ticker'
        options={{
          drawerLabel: 'Ticker',
          title: 'Moti',
        }}
      />
      <Drawer.Screen
        name='leaderboard'
        options={{
          drawerLabel: 'Leader board',
          title: 'Leader board',
        }}
      />
    </Drawer>
  );
}
