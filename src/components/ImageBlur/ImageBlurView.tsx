import React, { useEffect, useRef, useState } from 'react';
import { View, type ViewProps } from 'react-native';

import { type ImageBlurElement } from '../../contexts/ImageBlurContext';
import useImageBlur from '../../hooks/useImageBlur';

import { type ImageBlurRadius } from './ImageBlur';
import {
  type BlurShapeContainerStyle,
  type BlurShapeOverlay,
} from './ImageBlurShape';

export type ImageBlurViewContainerProps = {
  blurRadius?: ImageBlurRadius;
  overlay?: BlurShapeOverlay;
  style?: BlurShapeContainerStyle;
};

export type ImageBlurViewProps = Omit<ViewProps, 'ref'> & {
  containerProps?: ImageBlurViewContainerProps;
};

const ImageBlurView = ({
  children,
  containerProps,
  style,
  ...rest
}: ImageBlurViewProps) => {
  const { pushRef, pushContainerProps } = useImageBlur();

  const viewRef = useRef<ImageBlurElement>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;

    setMounted(true);
    pushContainerProps(containerProps);
    pushRef(viewRef);
  }, [containerProps, mounted, pushContainerProps, pushRef]);

  return (
    <View ref={viewRef} style={style} {...rest}>
      {children}
    </View>
  );
};

export default ImageBlurView;
