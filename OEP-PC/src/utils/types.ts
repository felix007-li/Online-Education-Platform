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
