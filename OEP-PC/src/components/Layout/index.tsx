/* eslint-disable import/extensions */
import { MenuDataItem, ProLayout } from '@ant-design/pro-components';
import { Link, useNavigate, useOutlet } from 'react-router-dom';
import { Space, Tooltip } from 'antd';
import { LogoutOutlined, ShopOutlined } from '@ant-design/icons';
import { useUserContext } from '@/hooks/userHooks';
import { AUTH_TOKEN } from '@/utils/constants';
import { ROUTE_KEY, routes } from '@/routes/menus';
import { useGoTo, useIsOrgRoute } from '@/hooks';
import styles from './index.module.less';
import OrgSelect from '../OrgSelect';

const menuItemRender = (
  item: MenuDataItem,
  dom: React.ReactNode,
) => <Link to={item.path || '/'}>{dom}</Link>;
/**
* Layout
*/
const Layout = () => {
  const outlet = useOutlet();
  const { store } = useUserContext();
  const isOrg = useIsOrgRoute();
  const { go } = useGoTo();
  const nav = useNavigate();

  const logoutHandler = () => {
    sessionStorage.setItem(AUTH_TOKEN, '');
    localStorage.setItem(AUTH_TOKEN, '');
    nav('/login');
  };

  const goToOrg = () => {
    go(ROUTE_KEY.ORG);
  };

  return (
    <ProLayout
      layout="mix"
      siderWidth={240}
      avatarProps={{
        src: store.avatar || null,
        title: store.name,
        size: 'small',
        onClick: () => go(ROUTE_KEY.MY),
      }}
      links={[
        <Space size={20} onClick={logoutHandler}>
          <LogoutOutlined />
          Exit
        </Space>,
      ]}
      title={false}
      logo={<img src="/src/assets/logo.png" alt="logo" />}
      className={styles.container}
      onMenuHeaderClick={() => nav('/')}
      route={{
        path: '/',
        routes,
      }}
      actionsRender={() => [
        !isOrg && <OrgSelect />,
        <Tooltip title="Store management">
          <ShopOutlined onClick={goToOrg} />
        </Tooltip>,
      ]}
      menuItemRender={menuItemRender}
    >
      <div key={store.currentOrg}>
        {outlet}
      </div>
    </ProLayout>
  );
};

export default Layout;
