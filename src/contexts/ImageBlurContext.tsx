import React, {
  createContext,
  type MutableRefObject,
  type ReactNode,
  useCallback,
  useRef,
  useState,
} from 'react';
import { type View } from 'react-native';

import { type ImageBlurEffectProps } from '../components/ImageBlur/ImageBlurView';

type ImageBlurContextProps = {
  children: ReactNode;
};

export type ImageBlurElement = View | null;
export type ImageBlurElementRef = MutableRefObject<ImageBlurElement>;

type ImageBlurContextType = {
  setBlurProps: (props: ImageBlurEffectProps | undefined) => void;
  getBlurProps: () => ImageBlurEffectProps | undefined;
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

  const blurProps = useRef<ImageBlurEffectProps | undefined>(undefined);

  const pushRef = useCallback((ref: ImageBlurElementRef) => {
    setBlurElementRefList(prev => (prev ? [...prev, ref] : [ref]));
  }, []);

  const getRefList = useCallback(() => {
    return blurElementRefList;
  }, [blurElementRefList]);

  const setBlurProps = useCallback(
    (props: ImageBlurEffectProps | undefined) => {
      blurProps.current = props;
    },
    [],
  );

  const getBlurProps = useCallback(() => {
    return blurProps.current;
  }, []);

  return (
    <ImageBlurContext.Provider
      value={{
        setBlurProps,
        getBlurProps,
        getRefList,
        pushRef,
      }}
    >
      {children}
    </ImageBlurContext.Provider>
  );
};
