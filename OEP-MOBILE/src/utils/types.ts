export interface IPropChild {
  children: React.ReactNode;
}

export interface IStudent {
  id: string;
  tel: string;
  name: string;
  avatar: string;
  openid: string;
}

export interface IProduct {
  id: string;
  limitBuyNumber: number;
  name: string;
  reason: string;
  coverUrl: string;
  bannerUrl: string;
  desc: string;
  originalPrice: number;
  stock: number;
  status: string;
  tags?: string;
  curStock: number;
  buyNumber?: number;
  preferentialPrice: number;
  displayType: string;
  distance?: string;
  org: IOrganization;
  cards?: ICard[];
}

export interface IOrganization {
  id: string;
  orgFrontImg?: IImage[];
  orgRoomImg?: IImage[];
  orgOtherImg?: IImage[];
  name: string;
  logo?: string;
  tags?: string;
  description?: string;
  address?: string;
  tel?: string;
  longitude?: number;
  latitude?: number;
  courses?: ICourse[];
}
export interface ICard {
  id: string;
  name: string;
  type: string;
  time: number;
  validityDay: number;
  course: ICourse;
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
  coverUrl?: string;
  teachers?: ITeacher[];
}

export interface ITeacher {
  id: string;
  name: string;
  photoUrl: string;
}

export type TBaseQuery<T = null> = { [key: string]: { __typename?: 'Query', data: T, page: IPage, code: number, message: string } };
export type TProductTypeQuery = TBaseQuery<IProductType[]>;
export type TProductsQuery = TBaseQuery<IProduct[]>;
export type TProductQuery = TBaseQuery<IProduct>;

export interface IProductType {
  key: string;
  title: string;
}
