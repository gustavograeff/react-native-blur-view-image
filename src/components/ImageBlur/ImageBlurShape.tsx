import React, { useCallback, useState } from 'react';
import {
  Image,
  type ImageResizeMode,
  type LayoutRectangle,
  Platform,
  type StyleProp,
  View,
  type ViewStyle,
} from 'react-native';

import useImageBlur from '../../hooks/useImageBlur';
import { getImageSource } from '../../utils/image';

import styles from './ImageBlur.styles';

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

const minIOSBlur = 5;

const ImageBlurShape = ({
  children,
  containerRef,
  image,
  position,
  resizeMode,
}: ImageBlurShapeProps): JSX.Element => {
  const { getRefList, getContainerProps } = useImageBlur();

  const [childrenRect, setChildrenRect] = useState<LayoutRectangle[] | null>(
    null,
  );

  const blurredElements = getRefList();
  const childrenMounted =
    blurredElements &&
    childrenRect &&
    childrenRect.length === blurredElements.length &&
    childrenRect[0]?.width !== undefined &&
    childrenRect[0]?.height !== undefined &&
    (childrenRect[0]?.x !== undefined || childrenRect[0]?.y !== undefined);
  const showBlur = blurredElements === null || childrenMounted;

  const getBlurShape = (rect: LayoutRectangle | undefined, index: number) => {
    const containerProps = getContainerProps(index);
    const blurRadius =
      containerProps?.blurRadius === undefined ? 16 : containerProps.blurRadius;

    return (
      <View
        aria-hidden={!showBlur}
        key={index}
        style={[
          containerProps?.style,
          styles.blurShapeContainer,
          styles.sticked,
          !showBlur && styles.hide,
          rect && {
            height: rect.height,
            width: rect.width,
            top: rect.y,
            left: rect.x,
          },
        ]}
      >
        <Image
          source={getImageSource(image.src)}
          style={[
            {
              width: image.width,
              height: image.height,
            },
            rect && { top: -rect.y, left: -rect.x },
          ]}
          resizeMode={resizeMode}
          blurRadius={
            blurRadius === 0
              ? 0
              : Platform.OS === 'android'
              ? blurRadius
              : blurRadius + minIOSBlur
          }
        />
        <View
          style={[
            styles.sticked,
            styles.fitAvailableSpace,
            {
              opacity: containerProps?.overlay?.opacity ?? 0.2,
              backgroundColor:
                containerProps?.overlay?.backgroundColor ?? '#000000',
            },
            !showBlur && styles.hide,
          ]}
        />
      </View>
    );
  };

  const calculateShapePosition = useCallback(() => {
    if (!blurredElements) return;

    blurredElements.forEach((elementRef, index) => {
      if (!containerRef?.current) return;
      if (!elementRef.current) return;

      elementRef.current.measureLayout(
        containerRef?.current,
        (x, y, width, height) => {
          setChildrenRect(prev => {
            if (prev) {
              prev[index] = { x, y, width, height };

              return [...prev];
            }

            return [{ x, y, width, height }];
          });
        },
      );
    });
  }, [blurredElements, containerRef]);

  return (
    <>
      {childrenRect?.map((rect, index) => {
        return getBlurShape(rect, index);
      })}

      <View
        aria-hidden={!showBlur}
        style={[styles.sticked, !showBlur && styles.hide, position]}
        onLayout={calculateShapePosition}
      >
        {children}
      </View>
    </>
  );
};

export default ImageBlurShape;
