import { FlatList, StyleSheet, View } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CarouselImageVariant, Photo, SearchPayload } from '@/types/carousel';
import PhotoItem from './Image/PhotoItem';
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
import BackdropPhoto from './Image/BackdropPhoto';
import { useLocalSearchParams } from 'expo-router';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SmallPhotoItem from './Image/SmallPhotoItem';
import ActivityIndicator from '../ActivityIndicator';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

  const { top, left, bottom, right } = useSafeAreaInsets();

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

  const { data, isLoading } = useQuery<SearchPayload>({
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
  const [modifiedData, setModifiedData] = useState<SearchPayload | undefined>(
    data
  );

  const handleDelete = () => {
    const photoIdByIndex = modifiedData?.photos[activeImageIndex].id;
    setModifiedData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        photos: prev.photos.filter((photo) => photo.id !== photoIdByIndex),
      };
    });
  };

  return (
    <>
      {isLoading ? (
        <ActivityIndicator loading />
      ) : (
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
          <View
            style={{
              position: 'absolute',
              top: top + _spacing,
              right: right + _spacing,
            }}
          >
            <TouchableOpacity onPress={handleDelete}>
              <Ionicons name='trash-bin-sharp' size={24} color={'tomato'} />
            </TouchableOpacity>
          </View>
          <View style={styles.backgroundImageContainer}>
            {modifiedData?.photos.map((photo, index) => {
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
            data={modifiedData?.photos}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item, index }) => {
              return (
                <PhotoItem
                  zoomable
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
              setActiveImageIndex(
                Number(params?.imageIndex) || info.index || 0
              );
              scrollToActiveIndex(
                Number(params?.imageIndex) || info.index || 0
              );
            }}
            onEndReached={() => {
              scrollToActiveIndex(
                modifiedData?.photos?.length
                  ? modifiedData.photos.length - 1
                  : 0
              );
            }}
            pagingEnabled
            style={{ flexGrow: 0 }}
            snapToInterval={width}
            decelerationRate={'fast'}
          />
          <View style={[styles.bottomListContainer, { bottom: bottom + 28 }]}>
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
              data={modifiedData?.photos}
              keyExtractor={(item) => item.id.toString()}
              decelerationRate={'fast'}
              renderItem={({ item, index }: { item: Photo; index: number }) => {
                return (
                  <SmallPhotoItem
                    scrollX={scrollX}
                    activeImageIndex={activeImageIndex}
                    index={index}
                    item={item}
                    onPress={scrollToActiveIndex}
                  />
                );
              }}
            />
          </View>
        </>
      )}
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
  },
  bottomList: {
    paddingRight: _imageListSpacing,
  },

  focalPoint: {
    ...StyleSheet.absoluteFillObject,
  },
  thumbContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
});
