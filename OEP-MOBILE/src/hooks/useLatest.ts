import { useRef } from 'react';

/*
* get latest value
*/
const useLatest = <T> (value: T) => {
  const ref = useRef(value);
  ref.current = value;
  return ref;
};

export default useLatest;
