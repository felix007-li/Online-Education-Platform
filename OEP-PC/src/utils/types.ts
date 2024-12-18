export interface IUser {
  id: string;
  tel: string;
  name: string;
  desc: string;
  avatar: string;
  refetchHandler?: () => void;
  currentOrg?: string;
}
