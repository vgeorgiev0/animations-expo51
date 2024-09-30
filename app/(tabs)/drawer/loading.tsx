import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import ActivityIndicator from '@/components/ActivityIndicator';

interface LoadingScreenProps {}

const LoadingScreen: React.FC<LoadingScreenProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.container}>
      <ActivityIndicator loading={loading} />
      <Button
        onPress={() => {
          setLoading((prev) => !prev);
        }}
        title='Change loading state'
      />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
