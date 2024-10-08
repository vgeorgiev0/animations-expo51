import { Dimensions, Pressable, Text, View } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import Animated from 'react-native-reanimated';
import sharedElementStyles from '@/constants/styles/SharedElementStyles';

interface SharedElementScreenProps {}

export const gallery = {
  florence: {
    color: '#b58df1',
    title: 'Beautiful city of Florence',
    description:
      'Florence was a centre of medieval European trade and finance and one of the wealthiest cities of that era.',
  },
  countryside: {
    color: '#82cab2',
    title: 'Tuscan countryside',
    description:
      "Tuscany's picturesque hills attract millions of tourists each year craving postcard-perfect views.",
  },
  dawn: {
    color: '#87cce8',
    title: 'Tuscany at dawn',
    description:
      'Tuscany is known for its magical mists in the morning and at sunset.',
  },
};

export type Tag = keyof typeof gallery;

const SharedElementScreen: React.FC<SharedElementScreenProps> = ({}) => {
  const chips = ['Italy', 'Tourism', 'Nature'];
  const goToDetails = (tag: Tag) => {
    router.navigate(`/(tabs)/drawer/shared-element/${tag}`);
  };

  const { width } = Dimensions.get('screen');
  return (
    <Animated.ScrollView style={sharedElementStyles.homeContainer}>
      <Pressable onPress={() => goToDetails('countryside')}>
        <Animated.View
          sharedTransitionTag={'countryside'}
          style={[
            sharedElementStyles.imageOne,
            { backgroundColor: gallery.countryside.color },
          ]}
        />
      </Pressable>
      <View style={sharedElementStyles.row}>
        <Pressable onPress={() => goToDetails('florence')}>
          <Animated.View
            sharedTransitionTag={'florence'}
            style={[
              { width: width / 2 - 35 },
              sharedElementStyles.imageTwo,
              { backgroundColor: gallery.florence.color },
            ]}
          />
        </Pressable>
        <Pressable onPress={() => goToDetails('dawn')}>
          <Animated.View
            sharedTransitionTag={'dawn'}
            style={[
              { width: width / 2 - 35 },
              sharedElementStyles.imageThree,
              { backgroundColor: gallery.dawn.color },
            ]}
          />
        </Pressable>
      </View>
      <Text style={sharedElementStyles.header}>Tuscany</Text>
      <View style={sharedElementStyles.row}>
        {chips.map((chip) => (
          <Text key={chip} style={sharedElementStyles.chip}>
            {chip}
          </Text>
        ))}
      </View>
      <Text style={sharedElementStyles.text}>
        Tuscany is known for its landscapes, history, artistic legacy, and its
        influence on high culture. It is regarded as the birthplace of the
        Italian Renaissance and of the foundations of the Italian language.
      </Text>
    </Animated.ScrollView>
  );
};
export default SharedElementScreen;
