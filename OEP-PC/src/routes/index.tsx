import Home from '@/containers/Home';
import Org from '@/containers/Org';
import My from '@/containers/My';
import Student from '@/containers/Student';
import Page404 from '@/containers/Page404';
import Course from '@/containers/Course';
import { ROUTE_KEY } from './menus';

export const ROUTE_COMPONENT = {
  [ROUTE_KEY.HOME]: Home,
  [ROUTE_KEY.MY]: My,
  [ROUTE_KEY.ORG]: Org,
  [ROUTE_KEY.STUDENT]: Student,
  [ROUTE_KEY.COURSE]: Course,
  [ROUTE_KEY.PAGE_404]: Page404,
};
