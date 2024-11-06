import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CarouselImageVariant, Photo, SearchPayload } from '@/types/carousel';
import PhotoItem from './PhotoItem';
import {
  _imageListSpacing,
  _smallImageSize,
  _spacing,
  uri,
  width,
} from '@/constants';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import BackdropPhoto from './BackdropPhoto';
import { useLocalSearchParams } from 'expo-router';
import Colors from '@/constants/Colors';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ThumbCarouselProps {}

const ThumbCarousel: React.FC<ThumbCarouselProps> = ({}) => {
  const scrollX = useSharedValue(0);
  const params = useLocalSearchParams();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x / width;
  });

  const topListRef = useRef<FlatList>(null);
  const thumbListRef = useRef<FlatList>(null);

  const { top, left } = useSafeAreaInsets();

  const scrollToActiveIndex = useCallback(
    (index: number) => {
      if (index === activeImageIndex) {
        return;
      }
      setActiveImageIndex(index);
      topListRef.current?.scrollToOffset({
        offset: index * width,
        animated: true,
      });
      if (
        index * (_smallImageSize + _imageListSpacing) - _smallImageSize / 2 >
        width / 2
      ) {
        thumbListRef.current?.scrollToOffset({
          offset:
            index * (_smallImageSize + _imageListSpacing) -
            width / 2 +
            _smallImageSize * 2,
          animated: true,
        });
      } else {
        thumbListRef.current?.scrollToOffset({
          offset: 0,
          animated: true,
        });
      }
    },
    [activeImageIndex, width]
  );

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
      <View
        style={{
          position: 'absolute',
          top: top + _spacing,
          left: left + _spacing,
        }}
      >
        <DrawerToggleButton />
      </View>
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
        ref={topListRef}
        onScroll={onScroll}
        scrollEventThrottle={1000 / 60} // 16.6ms
        data={data?.photos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => {
          return (
            <PhotoItem
              imageWidth={width}
              index={index}
              item={item}
              scrollX={scrollX}
              variant={CarouselImageVariant.SQUARE}
            />
          );
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        bounces={false}
        onMomentumScrollEnd={(ev) => {
          scrollToActiveIndex(
            Math.floor(ev.nativeEvent.contentOffset.x / width)
          );
        }}
        initialScrollIndex={
          Number(params?.imageIndex) > 0 ? Number(params?.imageIndex) : 0
        }
        getItemLayout={(_, index) => {
          return {
            length: width,
            offset: width * index,
            index,
          };
        }}
        onScrollToIndexFailed={(info) => {
          setActiveImageIndex(Number(params?.imageIndex) || info.index || 0);
          scrollToActiveIndex(Number(params?.imageIndex) || info.index || 0);
        }}
        onEndReached={() => {
          Platform.OS === 'android' &&
            scrollToActiveIndex(
              data?.photos?.length ? data.photos.length - 1 : 0
            );
        }}
        pagingEnabled
        style={{ flexGrow: 0 }}
        snapToInterval={width}
        decelerationRate={'fast'}
      />
      <View style={styles.bottomListContainer}>
        <FlatList
          key={'carousel' + width}
          ref={thumbListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            { paddingHorizontal: _imageListSpacing },
            styles.thumbContainer,
          ]}
          style={styles.bottomList}
          data={data?.photos}
          keyExtractor={(item) => item.id.toString()}
          decelerationRate={'fast'}
          renderItem={({ item, index }: { item: Photo; index: number }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  if (activeImageIndex === index) {
                    return;
                  }
                  scrollToActiveIndex(index);
                }}
              >
                <Image
                  source={{ uri: item.src.tiny }}
                  style={[
                    styles.smallImage,
                    activeImageIndex === index && styles.selectedImage,
                  ]}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </>
  );
};

export default ThumbCarousel;

const styles = StyleSheet.create({
  backgroundImageContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  bottomListContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 24,
  },
  bottomList: {
    paddingRight: _imageListSpacing,
  },
  smallImage: {
    width: _smallImageSize,
    height: _smallImageSize,
    borderRadius: 4,
    marginRight: _imageListSpacing,
  },
  selectedImage: {
    borderWidth: 2,
    borderColor: Colors.light.tint,
  },
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
  },
  thumbContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
