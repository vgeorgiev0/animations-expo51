import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import StackedCards from '@/components/StackedCards';

interface StackedCardsScreenProps {}

const StackedCardsScreen: React.FC<StackedCardsScreenProps> = ({}) => {
  return <StackedCards />;
};

export default StackedCardsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3e3e3',
  },
});
