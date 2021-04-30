import { MutableRefObject } from 'react';

export type BasicTarget<T = HTMLElement> =
  | (() => T | null)
  | T
  | null
  | MutableRefObject<T | null | undefined>;

export type TargetElement = HTMLElement | Element | Document | Window;

export function getTargetElement<E = TargetElement>(
  target?: BasicTarget<E>,
  defaultElement?: E,
): E | undefined | null {
  if (!target) {
    return defaultElement;
  }

  let targetElement: E | undefined | null;

  if (typeof target === 'function') {
    targetElement = (target as Function)();
  } else if ('current' in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }

  return targetElement;
}
