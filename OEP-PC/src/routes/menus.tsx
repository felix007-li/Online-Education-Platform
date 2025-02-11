import { GiftOutlined, HomeOutlined, PicRightOutlined, ShopOutlined, TeamOutlined } from '@ant-design/icons';

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
  COURSE: 'course',
  STUDENT: 'student',
  PRODUCT: 'product',
  TEACHER: 'teacher',
  NO_ORG: 'noOrg',
  PAGE_404: 'p404',
};

export const ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEY.HOME]: {
    path: '/',
    name: 'home',
    hideInMenu: true,
    icon: <HomeOutlined />,
  },
  [ROUTE_KEY.MY]: {
    path: 'my',
    name: 'personal info',
    hideInMenu: true,
    icon: <HomeOutlined />,
  },
  [ROUTE_KEY.ORG]: {
    path: 'org',
    name: 'Stores management',
    hideInMenu: true,
    icon: <ShopOutlined />,
  },
  [ROUTE_KEY.COURSE]: {
    path: 'course',
    name: 'Courses Management',
    icon: <PicRightOutlined />,
  },
  [ROUTE_KEY.STUDENT]: {
    path: 'student',
    name: 'Students Management',
    icon: <TeamOutlined />,
  },
  [ROUTE_KEY.PRODUCT]: {
    path: 'product',
    name: 'Products Management',
    icon: <GiftOutlined />,
  },
  [ROUTE_KEY.PAGE_404]:
    {
      path: '*',
      hideInMenu: true,
      name: '404',
    },
};

export const routes = Object.keys(ROUTE_CONFIG).map((key) => ({ ...ROUTE_CONFIG[key], key }));

export const getRouteByKey = (key: string) => ROUTE_CONFIG[key];
