/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { GET_USER } from '@/graphql/user';
import { IUser } from '@/utils/types';

export const useGetUser = () => {
  const nav = useNavigate();
  const location = useLocation();
  const { loading, refetch } = useQuery<{ getUserInfo: IUser }>(GET_USER, {
    onCompleted: (data) => {
      if (data.getUserInfo) {
        const {
          id, name, tel, desc, avatar,
        } = data.getUserInfo;

        if (location.pathname === '/login') {
          nav('/');
        }
        return;
      }
      if (location.pathname !== '/login') {
        nav(`/login?orgUrl=${location.pathname}`);
      }
    },
    onError: () => {
      if (location.pathname !== '/login') {
        nav(`/login?orgUrl=${location.pathname}`);
      }
    },
  });
  return { loading };
};
