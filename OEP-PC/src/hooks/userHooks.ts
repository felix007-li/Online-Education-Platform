/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { connectFactory, useAppContext } from '@/utils/contextFactory';
import { GET_USER } from '@/graphql/user';
import { IUser } from '@/utils/types';

const KEY = 'userInfo';
const DEFAULT_VALUE = {};

export const useUserContext = () => useAppContext<IUser>(KEY);

export const connect = connectFactory(KEY, DEFAULT_VALUE);

export const useGetUser = () => {
  const { setStore } = useUserContext();
  const nav = useNavigate();
  const location = useLocation();
  const { loading, refetch } = useQuery<{ getUserInfo: IUser }>(GET_USER, {
    onCompleted: (data) => {
      console.log('user info::', data);
      if (data.getUserInfo) {
        const {
          id, name, tel, desc, avatar,
        } = data.getUserInfo;
        setStore({
          id, name, tel, desc, avatar, refetchHandler: refetch,
        });

        if (location.pathname === '/login') {
          nav('/');
        }
        return;
      }
      setStore({ refetchHandler: refetch });

      if (location.pathname !== '/login') {
        nav(`/login?orgUrl=${location.pathname}`);
      }
    },
    onError: () => {
      setStore({ refetchHandler: refetch });
      if (location.pathname !== '/login') {
        nav(`/login?orgUrl=${location.pathname}`);
      }
    },
  });
  return { loading };
};
