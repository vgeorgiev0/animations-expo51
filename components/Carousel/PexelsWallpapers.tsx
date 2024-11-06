import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { SearchPayload } from '@/types/carousel';
import PhotoItem from './PhotoItem';
import { _imageWidth, _spacing, uri, width } from '@/constants';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import BackdropPhoto from './BackdropPhoto';

interface PexelsWallpapersProps {}

const PexelsWallpapers: React.FC<PexelsWallpapersProps> = ({}) => {
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x / (_imageWidth + _spacing);
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
        onScroll={onScroll}
        scrollEventThrottle={1000 / 60} // 16.6ms
        data={data?.photos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => {
          return <PhotoItem index={index} item={item} scrollX={scrollX} />;
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{ flexGrow: 0 }}
        snapToInterval={_imageWidth + _spacing}
        decelerationRate={'fast'}
        contentContainerStyle={{
          gap: _spacing,
          paddingHorizontal: (width - _imageWidth) / 2,
        }}
      />
    </>
  );
};

export default PexelsWallpapers;

const styles = StyleSheet.create({
  backgroundImageContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
});
