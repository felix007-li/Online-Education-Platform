import { Outlet } from 'react-router-dom';
import styles from './App.module.less';

const App = () => {
  <div className={styles.container}>
    <Outlet />
  </div>;
};

export default App;
