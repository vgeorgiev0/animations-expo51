import { Pressable } from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';

import { Text, View } from '@/components/FromTemplate/Themed';
import sharedElementStyles from '@/constants/styles/SharedElementStyles';
import { gallery, Tag } from '.';

interface DetailsScreenProps {}

const DetailsScreen: React.FC<DetailsScreenProps> = ({}) => {
  const params = useLocalSearchParams<{ tag: Tag }>();
  const { tag } = params;
  return (
    <View style={sharedElementStyles.detailContainer}>
      <Animated.View
        sharedTransitionTag={tag}
        style={[
          sharedElementStyles.detailsImage,
          { backgroundColor: gallery[tag].color },
        ]}
      />
      <View style={sharedElementStyles.wrapper}>
        <Animated.Text
          entering={FadeIn.delay(150).duration(1000)}
          style={[sharedElementStyles.header, sharedElementStyles.font28]}
        >
          {gallery[tag].title}
        </Animated.Text>
        <Animated.Text
          entering={FadeIn.delay(300).duration(1000)}
          style={sharedElementStyles.text}
        >
          {gallery[tag].description}
        </Animated.Text>
        <Animated.View
          entering={FadeIn.delay(500).duration(1000)}
          style={sharedElementStyles.callToActionWrapper}
        >
          <Pressable
            style={sharedElementStyles.callToAction}
            onPress={() => router.back()}
          >
            <Text style={sharedElementStyles.callToActionText}>
              see for yourself
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
};

export default DetailsScreen;
