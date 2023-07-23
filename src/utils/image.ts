import { type ImageSourcePropType } from 'react-native';

export const getImageSource = (src: string | number): ImageSourcePropType => {
  return typeof src === 'string'
    ? {
        uri: src,
      }
    : (src as ImageSourcePropType);
};
