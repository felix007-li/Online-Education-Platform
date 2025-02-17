import { LeftOutline } from 'antd-mobile-icons';
import classNames from 'classnames';
import style from './index.module.less';
import { useGoTo, useMatchedRoute, useTitle } from '@/hooks';

/**
* Header
*/
const Header = () => {
  const route = useMatchedRoute();
  useTitle(route?.name);
  const { back } = useGoTo();

  const onClickHandler = () => {
    back();
  };

  if (route?.hideHeader) {
    return null;
  }

  return (
    <div className={classNames({
      [style.containerLarge]: route?.isMenu,
      [style.containerSmall]: !route?.isMenu,
    })}
    >
      {!route?.isMenu && (<LeftOutline className={style.back} onClick={onClickHandler} />)}
      <div className="style.title">{route?.name}</div>
    </div>
  );
};

export default Header;
