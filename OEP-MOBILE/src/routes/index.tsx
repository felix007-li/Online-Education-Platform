import { ROUTE_KEY } from './menus';
import Home from '@/containers/Home';
import My from '@/containers/My';

export const ROUTE_COMPONENT = {
  [ROUTE_KEY.HOME]: Home,
  [ROUTE_KEY.MY]: My,
};
