// eslint-disable-next-line no-unused-vars
import {
  useEffect,
  useState,
  useRef,
  useCallback,
  EffectCallback,
  DependencyList,
} from 'react';
import isEqual from 'fast-deep-equal';

/**
 * @description: setInterval的hooks实现
 * @param {Function} func 要执行的函数
 * @param {Number} interval 执行间隔
 * @return {*} clearInterval
 */
export const useInterval = (func: () => void, interval: number) => {
  const funcRef = useRef(func);
  funcRef.current = func;
  useEffect(() => {
    const timer = setInterval(() => {
      funcRef.current();
    }, interval);
    return () => clearInterval(timer);
  }, []);
};

/**
 * @description setTimeout的hooks实现
 * @param {Function} func 要执行的函数
 * @param {Number} timeout 执行间隔
 * @param {Array} deps 依赖项
 * @return {Function} clearTimeout
 */
export const useTimeout = (func: () => void, timeout: number) => {
  // const [timer, setTimer] = useState();
  const timer = useRef(0);
  const funcRef = useRef(func);
  funcRef.current = func; // 每次进入hooks保存最新的执行函数
  const clear = () => clearTimeout(timer.current);
  useEffect(() => {
    const timer = setTimeout(funcRef.current, timeout);
    return () => clearTimeout(timer);
  }, []);
  return clear;
};

type UpdateFn = (preDeps: DependencyList, deps: DependencyList) => boolean;

/**
 * @description: 自定义useEffect的更新逻辑
 * @param {EffectCallback} effect 作用
 * @param {Array} deps 依赖
 * @param {Function} shouldUpdate 是否执行作用，返回true执行effect
 */
export const useShouldUpdateEffect = (
  effect: EffectCallback,
  deps: DependencyList,
  shouldUpdate: UpdateFn,
) => {
  const depsRef = useRef(deps);
  if (shouldUpdate(depsRef.current, deps)) {
    depsRef.current = deps;
  }
  useEffect(effect, depsRef.current);
};

/**
 * @description: 自定义useEffect的依赖比较逻辑
 * @param {EffectCallback} effect 作用
 * @param {Array} deps 依赖
 * @param {Function} compare 自定义比较函数
 */
export const useCustomCompareEffect = (
  effect: EffectCallback,
  deps: DependencyList,
  compare: UpdateFn,
) => useShouldUpdateEffect(effect, deps, (...args) => !compare(...args));

/**
 * @description: 使用深比较的useEffect
 * @param {EffectCallback} effect 作用
 * @param {Array} deps 依赖
 */
export const useDeepCompareEffect = (
  effect: EffectCallback,
  deps: DependencyList = [],
) => {
  return useCustomCompareEffect(effect, deps, isEqual);
};

/**
 * @description: 获取上一个值
 * @param {*} state 当前值
 * @return {*} 前一个值
 */
export const usePrevious = <T = any>(state: T) => {
  const prevRef = useRef<T>();
  const curRef = useRef(state);
  prevRef.current = curRef.current;
  curRef.current = state;
  return prevRef.current;
};

/**
 * @description: 值变化时打印
 * @param {array} args 打印内容
 */
export const useLog = (...args: any[]) => {
  useEffect(() => {
    console.log(...args);
  }, args);
};

/**
 * @description 真假值状态封装
 * @param {*} initialFlag 初始状态
 * @return {{ flag: Boolean, setTrue: Function, setFalse: Function, toggle: Function }}
 */
export const useFlag = (initialFlag: boolean) => {
  const [flag, setFlag] = useState(initialFlag);
  const setTrue = useCallback(() => setFlag(true), []);
  const setFalse = useCallback(() => setFlag(false), []);
  const toggle = useCallback(() => setFlag(f => !f), []);
  return {
    flag,
    setTrue,
    setFalse,
    toggle,
  };
};

/**
 * @description 弹出框状态封装
 * @param {Object} [initialProps] modal属性初始值
 * @return {{ open: Function, close: Function, visible: Boolean }}
 */
export const useModalAction = <T = any>(initialProps: T) => {
  const { flag, setFalse, setTrue } = useFlag(false);
  const [props, setProps] = useState(initialProps || {});
  const open = useCallback(props => {
    setTrue();
    setProps(props);
  }, []);
  const close = useCallback(() => {
    setFalse();
    setProps(initialProps);
  }, []);
  return {
    open,
    close,
    visible: flag,
    ...props,
  };
};
