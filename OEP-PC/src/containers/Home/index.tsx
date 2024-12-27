import { useState, useEffect } from 'react';

import style from './index.module.less';
import { useUserContext } from '@/hooks/userHooks';

/**
*
*/
const Home = ({}) => {
  const [state, setState] = useState();

  const { store } = useUserContext();
  console.log('user info in home page::', store);

  useEffect(() => {
    console.log(state, setState);
  }, []);
  return (<div className={style.container}>Home</div>);
};

export default Home;
