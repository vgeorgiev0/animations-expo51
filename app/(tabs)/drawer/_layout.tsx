import React from 'react';
import { Drawer } from 'expo-router/drawer';

export default function TabLayout() {
  return (
    <Drawer
      screenOptions={{
        unmountOnBlur: true,
      }}
    >
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
        name='carousel'
        options={{
          drawerLabel: 'Carousel',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name='carousel-with-thumb'
        options={{
          drawerLabel: 'Carousel With Thumb',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name='pinch-zoom'
        options={{
          drawerLabel: 'Pinch Zoom',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name='drag-and-drop-list'
        options={{
          drawerLabel: 'Drag and Drop List',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name='schedule-animation'
        options={{
          drawerLabel: 'Schedule Animation',
          headerShown: false,
        }}
      />
    </Drawer>
  );
}
