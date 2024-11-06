import React from 'react';
import { Stack, useGlobalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Not working properly
const SharedElementStackLayout = ({}) => {
  const params = useGlobalSearchParams();
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Shared Element',
          headerLeft: () => (
            <Ionicons
              name='arrow-back'
              size={26}
              onPress={() => router.push('/')}
            />
          ),
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
