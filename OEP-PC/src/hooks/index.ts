import { useEffect, useMemo } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/extensions
import {
  getRouteByKey, ROUTE_CONFIG, ROUTE_KEY, routes,
// eslint-disable-next-line import/extensions
} from '@/routes/menus';

export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, []);
};

export const useGoTo = () => {
  const nav = useNavigate();
  const back = () => nav(-1); // 上一页
  const go = (
    pageKey?: string,
    params?: Record<string, string | number>,
  ) => {
    if (!pageKey) {
      nav('/');
      return;
    }
    const route = getRouteByKey(pageKey);
    if (route && route.path) {
      if (!params) {
        nav(`/${route.path}`);
        return;
      }
      // /page/:id，把params: { id: 1 } => /page/1
      const url = route.path.replace(
        /\/:(\w+)/g,
        (exp: string, exp1: string) => `/${params[exp1]}`,
      );
      nav(`/${url}`);
    }
  };
  return { back, go };
};

export const useMatchedRoute = () => {
  const r = useLocation();
  const route = useMemo(() => routes.find(
    (item) => matchPath(`/${item.path}`, r.pathname),
  ), [r.pathname]);
  return route;
};

/**
 * get the route of current url
 */
export const useIsOrgRoute = () => {
  const curRoute = useMatchedRoute();
  if (curRoute?.path === ROUTE_CONFIG[ROUTE_KEY.ORG].path) {
    return true;
  }
  return false;
};
