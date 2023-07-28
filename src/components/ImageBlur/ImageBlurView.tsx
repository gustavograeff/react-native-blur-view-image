import React, { useEffect, useRef, useState } from 'react';
import { View, type ViewProps } from 'react-native';

import { type ImageBlurElement } from '../../contexts/ImageBlurContext';
import useImageBlur from '../../hooks/useImageBlur';

import { type ImageBlurRadius } from './ImageBlur';
import {
  type BlurShapeContainerStyle,
  type BlurShapeOverlay,
} from './ImageBlurShape';

export type ImageBlurEffectProps = {
  blurRadius?: ImageBlurRadius;
  overlay?: BlurShapeOverlay;
  style?: BlurShapeContainerStyle;
};

export type ImageBlurViewProps = Omit<ViewProps, 'ref'> & {
  blurProps?: ImageBlurEffectProps;
};

const ImageBlurView = ({
  children,
  blurProps,
  style,
  ...rest
}: ImageBlurViewProps) => {
  const { pushRef, setBlurProps } = useImageBlur();

  const viewRef = useRef<ImageBlurElement>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;

    setMounted(true);
    setBlurProps(blurProps);
    pushRef(viewRef);
  }, [blurProps, mounted, setBlurProps, pushRef]);

  return (
    <View ref={viewRef} style={style} {...rest}>
      {children}
    </View>
  );
};
export default ImageBlurView;
