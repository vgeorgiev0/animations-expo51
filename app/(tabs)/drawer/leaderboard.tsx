import { StyleSheet } from 'react-native';
import React from 'react';
import LeaderBoard, { User } from '@/components/Leaderboard';
import { View } from '@/components/FromTemplate/Themed';

const users: User[] = [
  { name: 'Pesho', score: 43 },
  { name: 'Jane', score: 22 },
  { name: 'Doe', score: 33 },
  { name: 'Moe', score: 24 },
  { name: 'Joe', score: 1 },
  { name: 'Boe', score: 26 },
  { name: 'Foe', score: 57 },
  { name: 'Coe', score: 28 },
  { name: 'Zoe', score: 90 },
  { name: 'Xoe', score: 21 },
];
const LeaderBoardScreen = () => {
  return (
    <View style={styles.container}>
      <LeaderBoard users={users} />
    </View>
  );
};

export default LeaderBoardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
