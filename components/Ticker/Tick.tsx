import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TextProps } from '../FromTemplate/Themed';

interface TickProps extends TextProps {
  fontSize: number;
}

const Tick: React.FC<TickProps> = ({ children, fontSize, style, ...rest }) => {
  return (
    <Text
      style={[
        style,
        {
          fontSize: fontSize,
          lineHeight: fontSize * 1.1,
          fontVariant: ['tabular-nums'],
          fontWeight: '900',
        },
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default Tick;

const styles = StyleSheet.create({});
