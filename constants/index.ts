import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');
const _imageWidth = width * 0.8;
const _imageHeight = _imageWidth * 1.76;
const _spacing = 12;

export { _imageWidth, _imageHeight, _spacing, width, height };
