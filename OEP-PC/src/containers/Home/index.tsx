import React, { FC } from 'react';
import { useState, useEffect } from 'react';

import style from './index.module.less';
import { useUserContext } from '@/hooks/userHooks';

/**
*
*/
const Home: FC = () => {
  const [state, setState] = useState();

  const { store } = useUserContext();

  useEffect(() => {
    console.log(state, setState);
  }, []);
  return (<div className={style.container}>Home</div>);
};

export default Home;
