import mySvg from '@/assets/my.svg';
import courseSvg from '@/assets/course.svg';

interface IRoute {
  path: string;
  name: string;
  icon?: string;
  isMenu?: boolean;
  hideHeader?: boolean;
}

export const ROUTE_KEY = {
  HOME: 'home',
  MY: 'my',
  ORG_INFO: 'orgInfo',
  PRODUCT_INFO: 'productInfo',
  BUY: 'buy',
  EDIT_INFO: 'editInfo',
  MY_COURSE: 'myCourse',
  ORDER_COURSE: 'orderCourse',
  MY_CARD: 'myCard',
};

export const ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEY.HOME]: {
    path: '',
    name: 'Premium courses',
    isMenu: true,
    icon: courseSvg,
  },
  [ROUTE_KEY.MY]: {
    path: 'my',
    name: 'My',
    isMenu: true,
    icon: mySvg,
  },
};

export const routes = Object.keys(ROUTE_CONFIG).map((key) => ({ ...ROUTE_CONFIG[key], key }));

export const getRouteByKey = (key: string) => ROUTE_CONFIG[key];
