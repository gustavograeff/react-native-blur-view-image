import React, { useRef, useState } from 'react';
import { Image, View } from 'react-native';

import { type AspectRatio, baseAspectRatio } from '../../constants/sizes';
import { ImageBlurProvider } from '../../contexts/ImageBlurContext';
import { getImageSource } from '../../utils/image';

import ImageBlurShape, { type ImageBlurShapeProps } from './ImageBlurShape';

import styles from './ImageBlur.styles';

type ImageBlurContainerSize = {
  height: number | undefined;
  width: number | undefined;
};

export type ImageBlurRadius = number;

export type ImageBlurProps = {
  aspectRatio: AspectRatio | number;
  blurShapes: Array<Pick<ImageBlurShapeProps, 'children' | 'position'>>;
  children?: React.ReactNode;
  resizeMode?: ImageBlurShapeProps['resizeMode'];
  src: string;
};

const ImageBlur = ({
  aspectRatio,
  blurShapes,
  children,
  resizeMode = 'contain',
  src,
}: ImageBlurProps) => {
  const [containerSize, setContainerSize] = useState<ImageBlurContainerSize>({
    height: undefined,
    width: undefined,
  });

  const containerRef = useRef<View | null>(null);

  return (
    <View
      onLayout={({ nativeEvent }) => {
        setContainerSize({
          width: nativeEvent.layout.width,
          height: nativeEvent.layout.height,
        });
      }}
      style={[
        styles.container,
        {
          aspectRatio:
            typeof aspectRatio === 'number'
              ? aspectRatio
              : baseAspectRatio[aspectRatio],
        },
      ]}
    >
      <Image
        style={[styles.sticked, styles.fitAvailableSpace]}
        resizeMode={resizeMode}
        source={getImageSource(src)}
      />
      {children}

      {blurShapes.length > 0 && (
        <View
          ref={containerRef}
          style={[styles.sticked, styles.fitAvailableSpace]}
        >
          {blurShapes.map((blurShape, index) =>
            !containerSize.height || !containerSize.width ? null : (
              <ImageBlurProvider key={index}>
                <ImageBlurShape
                  containerRef={containerRef}
                  image={{
                    height: containerSize.height,
                    src,
                    width: containerSize.width,
                  }}
                  position={blurShape.position}
                  resizeMode={resizeMode}
                >
                  {blurShape.children}
                </ImageBlurShape>
              </ImageBlurProvider>
            ),
          )}
        </View>
      )}
    </View>
  );
};

export default ImageBlur;
