import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');
const _imageWidth = width * 0.8;
const _imageHeight = _imageWidth * 1.8;
const _spacing = 12;
const _smallImageSize = 66;
const _imageListSpacing = 2;
const uri =
  'https://api.pexels.com/v1/search?query=mobile wallpaper&orientation=portrait';

export {
  _imageWidth,
  _imageHeight,
  _spacing,
  width,
  height,
  _smallImageSize,
  _imageListSpacing,
  uri,
};
