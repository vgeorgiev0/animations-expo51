import { StyleSheet } from 'react-native';
import React from 'react';
import { Text, View } from '../FromTemplate/Themed';
import Place from './Place';
import { useSharedValue } from 'react-native-reanimated';

export interface User {
  name: string;
  score: number;
}

interface LeaderBoardProps {
  users: User[];
}

const LeaderBoard: React.FC<LeaderBoardProps> = ({ users }) => {
  const _animationValue = useSharedValue(0);

  const userIndexWithTheHighestScore = users.reduce(
    (acc, curr, index) => (curr.score > users[acc].score ? index : acc),
    0
  );

  return (
    <View style={styles.container}>
      {users.map((user, index) => (
        <Place
          user={user}
          key={`
                  ${user.name}-${index}-${user.score}`}
          index={index}
          animationValue={_animationValue}
          highestScoreIndex={userIndexWithTheHighestScore}
          onFinish={
            index === users.length - 1
              ? () => {
                  _animationValue.value = 1;
                }
              : () => {}
          }
        />
      ))}
    </View>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'flex-end',
    height: 200,
    alignItems: 'flex-end',
  },
});
