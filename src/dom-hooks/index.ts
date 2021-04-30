import { useState, useEffect, useRef } from 'react';
import { getTargetElement, BasicTarget, TargetElement } from '../utils/dom';

/**
 * @description: 在hooks中使用事件监听器
 * @param {*} target  dom对象或其ref引用
 * @param {*} eventName 事件名称
 * @param {*} listener  事件监听器
 */
export const useEventListener = (
  target: BasicTarget<TargetElement>,
  eventName: string,
  listener: Function,
) => {
  const listenerRef = useRef(listener);
  listenerRef.current = listener;
  useEffect(() => {
    const targetElement = getTargetElement(target, window); // 放里面，不然targetElement会被缓存
    if (!targetElement?.addEventListener) {
      return;
    }
    const eventListener = (ev: Event) => {
      listenerRef.current && listenerRef.current(ev)
    }
    targetElement.addEventListener(eventName, eventListener);
    return targetElement.removeEventListener.bind(
      targetElement,
      eventName,
      eventListener,
    );
  }, [eventName, target]);
};

/**
 * @description: 监听元素大小变化
 * @param ref 元素ref引用
 * @return {{width: Number, height: Number}} {width, height}
 */
export const useSize = (target: BasicTarget) => {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  const updateSize = () => {
    const targetElement = getTargetElement(target);
    setSize({
      width: (targetElement as HTMLElement)?.clientWidth || 0,
      height: (targetElement as HTMLElement)?.clientHeight || 0,
    });
  };
  useEventListener(window, 'resize', updateSize);
  useEffect(() => {
    updateSize();
  }, []);
  return size;
};

const defaultMouseAttribute = {
  pageX: NaN,
  pageY: NaN,
  screenX: NaN,
  screenY: NaN,
  x: NaN,
  y: NaN,
  clientX: NaN,
  clientY: NaN,
};

/**
 * @description: 获取鼠标位置信息
 * @return {*} 鼠标位置信息
 */
export const useMouse = () => {
  const [attr, setAttr] = useState(defaultMouseAttribute);
  useEventListener(window, 'mousemove', (ev: MouseEvent) => {
    const { pageX, pageY, screenX, screenY, x, y, clientX, clientY } = ev;
    setAttr({ pageX, pageY, screenX, screenY, x, y, clientX, clientY });
  });
  return attr;
};
