export interface IPropChild {
  children: React.ReactNode;
}

export interface IValue {
  label: string;
  value: string;
}
export interface IUser {
  id: string;
  tel: string;
  name: string;
  desc: string;
  avatar: string;
  refetchHandler?: () => void;
  currentOrg?: string;
}
export interface IOrganization {
  id: string;
  orgFrontImg?: IMedia[];
  orgRoomImg?: IMedia[];
  orgOtherImg?: IMedia[];
  name: string;
  logo: string;
  tags?: string;
  description?: string;
  address?: string;
  tel?: string;
  longitude?: string;
  latitude?: string;
  identityCardBackImg:string
  identityCardFrontImg:string
  businessLicense?:string
}
export interface IPage {
  pageNum: number;
  pageSize: number;
  total: number;
}
export interface IMedia {
  id: string;
  url: string;
  remark: string;
}
export interface IStudent {
  name: string;
  id: string;
  tel: string;
  avatar: string;
  account: string;
}

export type TStudentQuery = { [key: string]: { __typename?: 'Query', data: IStudent[], page: IPage } };

export type TBaseOrganization = Partial<IOrganization>;

export type TOrgsQuery = { [key: string]: { __typename?: 'Query', data: IOrganization[], page: IPage } };

export type TOrgQuery = { [key: string]: { __typename?: 'Query', data: IOrganization } };

export type TWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface IOrderTime {
  startTime: string;
  endTime: string;
  key: number;
}
export interface IWeekCourse {
  week: TWeek;
  orderTime: IOrderTime[];
}
export interface ICourse {
  id: string;
  name: string;
  desc?: string;
  group?: string; 
  baseAbility?: string;
  limitNumber: number; 
  duration: number;
  reserveInfo?: string;
  refundInfo?: string;
  otherInfo?: string;
  reducibleTime: IWeekCourse[];
  // teachers: ITeacher[];
}

export type TCoursesQuery = { [key: string]: { __typename?: 'Query', data: ICourse[], page: IPage } };

export type TCourseQuery = { [key: string]: { __typename?: 'Query', data: ICourse, page: IPage } };

export type TBaseCourse = Partial<ICourse>;

export interface ITeacher {
  id: string;
  name: string;
  photoUrl: string;
  teacherTime: number;
  education: string;
  seniority: string;
  experience: string;
  carryPrize: string;
  tags: string;
}

export type TBaseTeacher = Partial<ITeacher>;
export type TTeachersQuery = { [key: string]: { __typename?: 'Query', data: ITeacher[], page: IPage } };
export type TTeacherQuery = { [key: string]: { __typename?: 'Query', data: ITeacher } };