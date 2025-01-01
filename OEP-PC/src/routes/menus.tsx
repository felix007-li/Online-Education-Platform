import { HomeOutlined, ShopOutlined } from '@ant-design/icons';

interface IRoute {
  path: string;
  name: string;
  icon?: React.ReactNode;
  hideInMenu?: boolean;
}

export const ROUTE_KEY = {
  HOME: 'home',
  MY: 'my',
  ORG: 'org',
  PAGE_404: 'p404',
};

export const ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEY.HOME]: {
    path: '/',
    name: 'home',
    hideInMenu: false,
    icon: <HomeOutlined />,
  },
  [ROUTE_KEY.MY]: {
    path: 'my',
    name: 'personal info',
    hideInMenu: false,
    icon: <HomeOutlined />,
  },
  // [ROUTE_KEY.ORG]: {
  //   path: 'org',
  //   name: 'Store management',
  //   hideInMenu: false,
  //   icon: <ShopOutlined />,
  // },
  [ROUTE_KEY.PAGE_404]:
    {
      path: '*',
      hideInMenu: false,
      name: '404',
    },
};

export const routes = Object.keys(ROUTE_CONFIG).map((key) => ({ ...ROUTE_CONFIG[key], key }));

export const getRouteByKey = (key: string) => ROUTE_CONFIG[key];
