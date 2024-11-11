import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { SearchPayload } from '@/types/carousel';
import { uri, width } from '@/constants';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import BackdropPhoto from './Image/BackdropPhoto';
import ZoomImage from './Image/ZoomImage';

interface WithZoomProps {}

const WithZoom: React.FC<WithZoomProps> = ({}) => {
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x / width;
  });

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
    <>
      <View style={styles.backgroundImageContainer}>
        {data?.photos.map((photo, index) => {
          return (
            <BackdropPhoto
              key={`${index}-${photo.id}`}
              photo={photo}
              index={index}
              scrollX={scrollX}
            />
          );
        })}
      </View>
      <Animated.FlatList
        pinchGestureEnabled
        onScroll={onScroll}
        scrollEventThrottle={1000 / 60} // 16.6ms
        data={data?.photos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => {
          return <ZoomImage item={item} />;
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{ flexGrow: 0 }}
        snapToInterval={width}
        decelerationRate={'fast'}
      />
    </>
  );
};

export default WithZoom;

const styles = StyleSheet.create({
  backgroundImageContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
});
