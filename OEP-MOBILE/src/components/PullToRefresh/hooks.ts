import { useState, useEffect, useRef } from 'react';

import style from './index.module.less';

const MAX_Y = 100;

export const STATUS = {
  START: 'start',
  AWAIT: 'await',
  LOADING: 'loading',
  SUCCESS: 'success',
  FINISH: 'finish',
};

export const TIPS = {
  [STATUS.START]: 'Start pull-down refresh',
  [STATUS.AWAIT]: 'Release refresh immediately',
  [STATUS.LOADING]: 'Refreshing',
  [STATUS.SUCCESS]: 'Refresh successfully',
};

const usePullToRefresh = (onRefresh: () => void) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState(STATUS.FINISH);

  const y = useRef(0);
  useEffect(() => {
    if (!containerRef.current) return () => {};
    containerRef.current.ontouchstart = (e) => {
      e.preventDefault();
      if (document.documentElement.scrollTop === 0) {
        y.current = e.touches[0].pageY;
      }
    };
    containerRef.current.ontouchmove = async (e) => {
      e.preventDefault();
      if (document.documentElement.scrollTop === 0) {
        if (e.touches[0].pageY - y.current > MAX_Y) {
          setStatus(STATUS.AWAIT);
          return;
        }
        if (e.touches[0].pageY - y.current > 0) {
          setStatus(STATUS.START);
        }
      }
    };
    return () => {
      if (containerRef.current) {
        containerRef.current.ontouchstart = null;
        containerRef.current.ontouchmove = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return () => {};
    containerRef.current.ontouchend = async (e) => {
      e.preventDefault();
      if (status === STATUS.AWAIT) {
        setStatus(STATUS.LOADING);
        await onRefresh();
        setStatus(STATUS.SUCCESS);
        setTimeout(() => {
          setStatus(STATUS.FINISH);
        }, 500);
        return;
      }
      setStatus(STATUS.FINISH);
    };
    return () => {
      if (containerRef.current) {
        containerRef.current.ontouchend = null;
      }
    };
  }, [status]);

  return {
    status,
    containerRef,
  };
};

export default usePullToRefresh;
