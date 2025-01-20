import { useEffect } from 'react';

/**
 * run when component was loaded
 */
const useMount = (fn: () => void) => {
  useEffect(() => {
    fn?.();
  }, []);
};

export default useMount;
