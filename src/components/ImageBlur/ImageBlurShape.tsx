import React from 'react';
import {
  Image,
  type ImageResizeMode,
  type StyleProp,
  View,
  type ViewStyle,
} from 'react-native';

import { getImageSource } from '../../utils/image';

type BlurShapePosition = {
  bottom?: number | `${number}%`;
  left?: number | `${number}%`;
  right?: number | `${number}%`;
  top?: number | `${number}%`;
};

type BlurShapeImage = {
  height: number;
  src: string;
  width: number;
};

export type BlurShapeContainerStyle = StyleProp<
  Omit<
    ViewStyle,
    | 'overflow'
    | 'position'
    | 'height'
    | 'width'
    | 'opacity'
    | 'top'
    | 'left'
    | 'bottom'
    | 'right'
  >
>;

export type BlurShapeOverlay = Pick<ViewStyle, 'backgroundColor' | 'opacity'>;

export type ImageBlurShapeProps = {
  children: React.ReactNode;
  containerRef: React.MutableRefObject<View | null>;
  image: BlurShapeImage;
  position: BlurShapePosition;
  resizeMode: ImageResizeMode;
};

const ImageBlurShape = ({
  children,
  containerRef,
  image,
  position,
  resizeMode,
}: ImageBlurShapeProps): JSX.Element => {
  return (
    <>
      <View
        style={{
          backgroundColor: 'black',
          width: 100,
          height: 150,
          left: 100,
          top: 40,
          overflow: 'hidden',
          // opacity: 0.6,
        }}
      >
        <Image
          blurRadius={0}
          source={getImageSource(image.src)}
          style={{
            width: image.width,
            height: image.height,
            left: -100,
            top: -40,
            opacity: 0.7,
          }}
          resizeMode={resizeMode}
        />
      </View>
    </>
  );
};

export default ImageBlurShape;
