import { useRef, useState, useMemo } from 'react';

type DragOptions<E> = {
  onDragStart?: (data: any, ev: DragEvent) => void;
  onDragEnd?: (data: any, ev: DragEvent) => void;
};

/**
 * @description: 获取可以被拖拽的元素属性
 * @param {Object} config 拖拽开始执行的函数, 拖拽结束执行的函数
 * @return {Function} 一个获取拖拽属性的函数，入参为拖拽传输的数据
 */
export const useDrag = <E = HTMLElement>(config: DragOptions<E>) => {
  const { onDragStart, onDragEnd } = config;
  return (data: any) => ({
    draggable: 'true',
    key: JSON.stringify(data),
    onDragStart: (ev: DragEvent) => {
      ev.dataTransfer?.setData('custom', JSON.stringify(data));
      onDragStart && onDragStart(data, ev);
    },
    onDragEnd: (ev: DragEvent) => {
      onDragEnd && onDragEnd(data, ev);
    },
  });
};

type DropOptions = {
  onDrop?: (data: any, ev: DragEvent) => void
}

/**
 * @description: 获取接收被拖拽内容的元素的属性
 * @return {Object} 释放元素属性
 */
export const useDrop = (options: DropOptions) => {
  const [isHovering, setIsHovering] = useState(false);
  const optionsRef = useRef(options);
  optionsRef.current = options; // 保证每次执行的函数都是最新的
  const props = useMemo(
    () => ({
      onDragOver: (ev: Event) => {
        ev.preventDefault(); // 必须禁用默认事件
      },
      onDrop: (ev: any) => {
        ev.preventDefault();
        ev.persist();
        setIsHovering(false);
        let data = ev.dataTransfer.getData('custom');
        try {
          data = JSON.parse(data);
        } catch (err) {}
        optionsRef.current.onDrop?.(data, ev);
      },
      onDragEnter: (ev: Event) => {
        ev.preventDefault();
        setIsHovering(true);
      },
      onDragLeave: (ev: Event) => {
        ev.preventDefault();
        setIsHovering(false);
      },
    }),
    [setIsHovering],
  );
  return [props, { isHovering }];
};
