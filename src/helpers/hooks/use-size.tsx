import { RefObject, useLayoutEffect, useState } from 'react';
import useResizeObserver from '@react-hook/resize-observer';

export const useSize = <T extends HTMLElement = HTMLElement>(
  target: RefObject<T>
) => {
  const [size, setSize] = useState<DOMRectReadOnly>();

  useLayoutEffect(() => {
    setSize(target?.current?.getBoundingClientRect?.());
  }, [target]);

  useResizeObserver(target, entry => setSize(entry.contentRect));
  return size;
};
