import { ICourse } from '@/utils/types';
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { useCourses } from '@/services/course';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import { getColumns } from './constants';
import EditCourse from './components/EditCourse';
import OrderTime from './components/OrderTime';
import ConsumeCard from './components/ConsumeCard';

/**
* Current Courses
*/
const Course = () => {
  const actionRef = useRef<ActionType>();
  const [curId, setCurId] = useState('');
//   const { data, refetch } = useCourses();
  const { refetch } = useCourses();

  const [showInfo, setShowInfo] = useState(false);
  const [showOrderTime, setShowOrderTime] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const onClickAddHandler = (id?: string) => {
    if (id) {
      setCurId(id);
    } else {
      setCurId('');
    }
    setShowInfo(true);
  };

  const closeAndRefetchHandler = (isReload?: boolean) => {
    setShowInfo(false);
    if (isReload) {
      actionRef.current?.reload();
    }
  };

  const onOrderTimeHandler = (id: string) => {
    setCurId(id);
    setShowOrderTime(true);
  };

  const onCardHandler = (id: string) => {
    setCurId(id);
    setShowCard(true);
  };

  return (
    <PageContainer header={{ title: 'Current Courses' }}>
      <ProTable<ICourse>
        rowKey="id"
        actionRef={actionRef}
        columns={getColumns({
          onEditHandler: onClickAddHandler,
          onOrderTimeHandler,
          onCardHandler,
        })}
        // dataSource={data}
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
        }}
        toolBarRender={() => [
          <Button key="add" onClick={() => onClickAddHandler()} type="primary" icon={<PlusOutlined />}>
            New
          </Button>,
        ]}
        request={refetch}
      />
      {showInfo && <EditCourse id={curId} onClose={closeAndRefetchHandler} />}
      {showOrderTime && <OrderTime id={curId} onClose={() => setShowOrderTime(false)} />}
      {showCard && <ConsumeCard id={curId} onClose={() => setShowCard(false)} />}
    </PageContainer>
  );
};

export default Course;
