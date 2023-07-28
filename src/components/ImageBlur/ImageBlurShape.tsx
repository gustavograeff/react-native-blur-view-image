import React, { useCallback, useEffect, useState } from 'react';
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
  resizeMode: ImageResizeMode;
};

const minIOSBlur = 5;

const ImageBlurShape = ({
  children,
  containerRef,
  image,
  resizeMode,
}: ImageBlurShapeProps): JSX.Element => {
  const { getRefList, getBlurProps } = useImageBlur();

  const [childrenRect, setChildrenRect] = useState<LayoutRectangle[] | null>(
    null,
  );

  const blurredElements = getRefList();
  const showBlur =
    childrenRect &&
    blurredElements &&
    childrenRect.length === blurredElements.length;

  const getBlurShape = (rect: LayoutRectangle | undefined, index: number) => {
    const blurProps = getBlurProps();
    const blurRadius =
      blurProps?.blurRadius === undefined ? 16 : blurProps.blurRadius;

    return (
      <View
        aria-hidden={!showBlur}
        key={index}
        style={[
          blurProps?.style,
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
              opacity: blurProps?.overlay?.opacity ?? 0.2,
              backgroundColor: blurProps?.overlay?.backgroundColor ?? '#000000',
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

  useEffect(() => {
    calculateShapePosition();
  }, [calculateShapePosition, children]);

  return (
    <>
      {childrenRect?.map((rect, index) => {
        return getBlurShape(rect, index);
      })}

      <View
        aria-hidden={!showBlur}
        style={[styles.sticked, styles.inset]}
        onLayout={() => {
          calculateShapePosition();
        }}
      >
        {children}
      </View>
    </>
  );
};

export default ImageBlurShape;
