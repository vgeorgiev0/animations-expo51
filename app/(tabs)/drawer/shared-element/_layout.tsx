import React from 'react';
import { Stack, useGlobalSearchParams } from 'expo-router';
import { DrawerToggleButton } from '@react-navigation/drawer';

const SharedElementStackLayout = ({}) => {
  const params = useGlobalSearchParams();

  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name='index'
        options={{
          title: 'Shared Element',
          headerLeft: () => <DrawerToggleButton />,
        }}
      />
      <Stack.Screen
        name='[tag]'
        options={{
          title: params?.id ? `Details - ${params?.id}` : 'Details',
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default SharedElementStackLayout;
