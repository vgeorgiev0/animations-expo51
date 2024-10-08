import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Drawer } from 'expo-router/drawer';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
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
      <Drawer.Screen
        name='phone-ring'
        options={{
          drawerLabel: 'Phone Ring',
          title: 'Phone Ring',
        }}
      />
      <Drawer.Screen
        name='loading'
        options={{
          drawerLabel: 'Loading',
          title: 'Loading with Skia',
        }}
      />
      <Drawer.Screen
        name='shake'
        options={{
          drawerLabel: 'Shake',
          title: 'Animated Shake',
        }}
      />
      <Drawer.Screen
        name='stacked-cards'
        options={{
          drawerLabel: 'Stacked Cards',
          title: 'Stacked Cards',
        }}
      />
      <Drawer.Screen
        name='shared-element'
        options={{
          drawerLabel: 'Shared Element',
          headerShown: false,
        }}
      />
    </Drawer>
  );
}
