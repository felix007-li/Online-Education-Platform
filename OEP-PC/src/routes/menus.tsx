interface IRoute {
  path: string;
  name: string;
  icon?: React.ReactNode;
  hideInMenu?: boolean;
}

export const ROUTE_KEY = {
  PAGE_404: 'p404',
};

export const ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEY.PAGE_404]:
    {
      path: '*',
      hideInMenu: true,
      name: '404',
    },
};

export const routes = Object.keys(ROUTE_CONFIG).map((key) => ({ ...ROUTE_CONFIG[key], key }));

export const getRouteByKey = (key: string) => ROUTE_CONFIG[key];
