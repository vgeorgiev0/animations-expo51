import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { SearchPayload } from '@/types/carousel';
import { uri } from '@/constants';
import ThumbCarousel from '@/components/Carousel/ThumbCarousel';

interface CarouselWithThumbProps {}

const CarouselWithThumb: React.FC<CarouselWithThumbProps> = ({}) => {
  const { data } = useQuery<SearchPayload>({
    queryKey: ['wallpapers'],
    queryFn: async () => {
      const res = await fetch(uri, {
        // @ts-expect-error
        headers: {
          Authorization: process.env.EXPO_PUBLIC_PEXELS_API_KEY,
        },
      }).then((res) => res.json());
      return res;
    },
  });
  return (
    <View style={styles.container}>
      <ThumbCarousel />
    </View>
  );
};

export default CarouselWithThumb;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
