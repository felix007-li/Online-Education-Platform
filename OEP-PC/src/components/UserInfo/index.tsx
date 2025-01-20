import { IPropChild } from '@/utils/types';
import { connect, useGetUser } from '@/hooks/userHooks';
import { Spin } from 'antd';

/**
* User Information
*/
const UserInfo = ({ children }: IPropChild) => {
  const { loading } = useGetUser();

  return (
    <Spin spinning={loading}>
        <div style={{ height: '100vh' }}>{children}</div>
    </Spin>
  );
};

export default connect(UserInfo);
