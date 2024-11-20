import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface DNDHeaderProps {
  title: string;
  onPress: () => void;
  withSwipe: boolean;
}

const DNDHeader: React.FC<DNDHeaderProps> = ({ onPress, title, withSwipe }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {/* <TouchableOpacity onPress={onPress}>
        <Ionicons name={withSwipe ? 'close' : 'add'} size={32} color='grey' />
      </TouchableOpacity> */}
    </View>
  );
};

export default DNDHeader;

const styles = StyleSheet.create({
  header: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: '5%',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  title: {
    fontSize: 22,
    fontWeight: 'semibold',
    color: 'grey',
  },
});
