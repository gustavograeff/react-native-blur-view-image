import React, {
  createContext,
  type MutableRefObject,
  type ReactNode,
  useCallback,
  useRef,
  useState,
} from 'react';
import { type View } from 'react-native';

import { type ImageBlurViewContainerProps } from '../components/ImageBlur';

type ImageBlurContextProps = {
  children: ReactNode;
};

export type ImageBlurElement = View | null;
export type ImageBlurElementRef = MutableRefObject<ImageBlurElement>;

type ImageBlurContextType = {
  pushContainerProps: (props: ImageBlurViewContainerProps | undefined) => void;
  getContainerProps: (index: number) => ImageBlurViewContainerProps | undefined;
  pushRef: (ref: ImageBlurElementRef) => void;
  getRefList: () => ImageBlurElementRef[] | null;
};

export const ImageBlurContext = createContext<ImageBlurContextType | undefined>(
  undefined,
);

export const ImageBlurProvider = ({
  children,
}: ImageBlurContextProps): JSX.Element => {
  const [blurElementRefList, setBlurElementRefList] = useState<
    ImageBlurElementRef[] | null
  >(null);

  const containerPropList = useRef<Array<
    ImageBlurViewContainerProps | undefined
  > | null>(null);

  const pushRef = useCallback((ref: ImageBlurElementRef) => {
    setBlurElementRefList(prev => (prev ? [...prev, ref] : [ref]));
  }, []);

  const getRefList = useCallback(() => {
    return blurElementRefList;
  }, [blurElementRefList]);

  const pushContainerProps = useCallback(
    (props: ImageBlurViewContainerProps | undefined) => {
      if (!containerPropList.current) containerPropList.current = [];

      containerPropList.current = [...containerPropList.current, props];
    },
    [],
  );

  const getContainerProps = useCallback((index: number) => {
    return containerPropList.current?.[index];
  }, []);

  return (
    <ImageBlurContext.Provider
      value={{
        getContainerProps,
        pushContainerProps,
        getRefList,
        pushRef,
      }}
    >
      {children}
    </ImageBlurContext.Provider>
  );
};
