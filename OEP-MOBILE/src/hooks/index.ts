import { useEffect } from 'react';

export const useTitle = (title: string | undefined) => {
  useEffect(() => {
    document.title = title || 'Online Education Platform';
  }, [title]);
};

// import { useMemo } from "react";
// import { matchPath, useLocation } from "react-router-dom";
// import {
//     getRouteByKey, routes,
//   } from '@/routes/menus';

// export const useMatchedRoute = () => {
//     const r = useLocation();
//     const route = useMemo(() => routes.find(
//       (item) => matchPath(`/${item.path}`, r.pathname),
//     ), [r.pathname]);
//     return route;
//   };
