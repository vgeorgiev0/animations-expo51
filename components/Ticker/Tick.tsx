import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TextProps } from '../Themed';

interface TickProps extends TextProps {}

const Tick: React.FC<TickProps> = ({ children, ...rest }) => {
  return <Text {...rest}>{children}</Text>;
};

export default Tick;

const styles = StyleSheet.create({});
