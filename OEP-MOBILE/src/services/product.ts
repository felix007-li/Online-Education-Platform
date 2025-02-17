import { useLazyQuery, useQuery } from '@apollo/client';
import { Toast } from 'antd-mobile';
import { useEffect, useRef, useState } from 'react';
import {
  GET_PRODUCT, GET_PRODUCT_TYPES, GET_PRODUCTS, GET_PRODUCTS_BY_ORG_ID,
} from '@/graphql/product';
import { DEFAULT_PAGE_SIZE, DEFAULT_TYPE } from '@/utils/constants';
import {
  IProduct, TProductQuery, TProductTypeQuery, TProductsQuery,
} from '@/utils/types';

export const useProductTypes = () => {
  const { data, loading } = useQuery<TProductTypeQuery>(GET_PRODUCT_TYPES);
  return {
    data: data?.getProductTypes.data || [],
    loading,
  };
};

export const getPosition = () => new Promise<{ latitude: number; longitude: number }>((r) => {
  navigator.geolocation.getCurrentPosition((pos) => {
    const { latitude, longitude } = pos.coords;
    r({ latitude, longitude });
  }, () => {
    r({ latitude: 0, longitude: 0 });
  }, {
    timeout: 3000,
    maximumAge: 1000 * 60 * 30,
  });
});

export const useProducts = (name = '', type = '') => {
  const pn = useRef(1);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState<IProduct[]>([]);
  const [get] = useLazyQuery<TProductsQuery>(GET_PRODUCTS);

  const init = async (pageNum = 1) => {
    const toast = Toast.show({
      icon: 'loading',
      content: 'Loading...',
    });
    const { latitude, longitude } = await getPosition();
    const res = await get({
      fetchPolicy: 'network-only',
      variables: {
        name,
        type: type === DEFAULT_TYPE ? '' : type,
        latitude,
        longitude,
        page: {
          pageNum,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      },
      onCompleted() {
        toast.close();
      },
    });
    return res.data?.getProductsForH5.data || [];
  };

  const onRefreshHandler = async () => {
    pn.current = 1;
    const res = await init();
    if (res.length < DEFAULT_PAGE_SIZE) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
    setData(res);
  };

  useEffect(() => {
    onRefreshHandler();
  }, [name, type]);

  const loadMoreHandler = async () => {
    const res = await init(pn.current + 1);
    if (res.length > 0) {
      pn.current += 1;
      setHasMore(true);
      setData((old) => [...old, ...res]);
    } else {
      setHasMore(false);
    }
  };

  return {
    onRefresh: onRefreshHandler,
    loadMore: loadMoreHandler,
    hasMore,
    data,
  };
};

export const useProductsByOrgId = (orgId: string) => {
  const { data } = useQuery<TProductsQuery>(
    GET_PRODUCTS_BY_ORG_ID,
    {
      variables: {
        orgId,
      },
    },
  );

  return data?.getProductsByOrgIdForH5.data;
};

export const useProductInfo = (id?: string) => {
  const { data, loading } = useQuery<TProductQuery>(GET_PRODUCT, {
    variables: {
      id,
    },
  });

  return { data: data?.getProductInfo.data, loading };
};
