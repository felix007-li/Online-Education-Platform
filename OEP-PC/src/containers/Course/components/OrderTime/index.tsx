import { useState } from 'react';
import {
  Button, Col, Drawer, Row, Space, Tabs,
} from 'antd';
import { EditableProTable } from '@ant-design/pro-components';
import { ChromeOutlined, RedoOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { IOrderTime } from '@/utils/types';
import {
    DAYS, IDay, getColumns, getMaxKey, isWorkDay,
  } from './constants';
import { useOrderTime } from './hooks';

import style from './index.module.less';

interface IProps {
  id: string;
  onClose: (isReload?: boolean) => void;
}
/**
* Order Time
*/
const OrderTime = ({
  onClose,
  id,
}: IProps) => {
  const [currentDay, setCurrentDay] = useState<IDay>(DAYS[0]);
  const onTabChangeHandler = (key: string) => {
    const current = DAYS.find((item) => item.key === key) as IDay;
    setCurrentDay(current);
  };

  const {
    orderTime,
    loading,
    onDeleteHandler,
    onSaveHandler,
    allWeekSyncHandler,
    allWorkDaySyncHandler,
  } = useOrderTime(id, currentDay.key);

  return (
    <Drawer
      title="Edit Order time"
      width={720}
      open
      onClose={() => onClose()}
    >
      <Tabs
        type="card"
        items={DAYS}
        onChange={onTabChangeHandler}
      />
      <EditableProTable<IOrderTime>
        headerTitle={(
          <Space>
            Select
            <span className={style.name}>
              {currentDay.label}
            </span>
            lesson for open appointment times
          </Space>
        )}
        loading={loading}
        rowKey="key"
        recordCreatorProps={{
          record: () => ({
            key: getMaxKey(orderTime) + 1,
            startTime: '12:00:00',
            endTime: '12:30:00',
          }),
        }}
        value={orderTime}
        columns={getColumns(onDeleteHandler)}
        editable={{
          onSave: async (rowKey, d) => {
            let newData = [];
            if (orderTime.findIndex((item) => item.key === rowKey) > -1) {
              newData = orderTime?.map((item) => (item.key === rowKey ? _.omit(d, 'index') : { ...item }));
            }
            newData = [...orderTime, _.omit(d, 'index')];
            onSaveHandler(newData);
          },
          onDelete: async (key) => {
            onDeleteHandler(key as number);
          },
        }}
      />
      <Row gutter={20} className={style.buttons}>
        <Col span={12}>
          <Button
            icon={<RedoOutlined />}
            style={{ width: '100%' }}
            type="primary"
            disabled={!isWorkDay(currentDay.key)}
            onClick={allWorkDaySyncHandler}
          >
            Sync throughout the working day
          </Button>
        </Col>
        <Col span={12}>
          <Button
            icon={<ChromeOutlined />}
            style={{ width: '100%' }}
            type="primary"
            danger
            onClick={allWeekSyncHandler}
          >
            Sync all week
          </Button>
        </Col>
      </Row>
    </Drawer>
  );
};

export default OrderTime;
