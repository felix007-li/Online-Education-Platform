import { IOrderTime, TWeek } from '@/utils/types';
import { ProColumns } from '@ant-design/pro-components';
import { Popconfirm, Space } from 'antd';

export interface IDay {
  key: TWeek;
  label: string;
}

export const DAYS: IDay[] = [
  {
    key: 'monday',
    label: 'Monday',
  },
  {
    key: 'tuesday',
    label: 'Tuesday',
  },
  {
    key: 'wednesday',
    label: 'Wednesday',
  },
  {
    key: 'thursday',
    label: 'Thursday',
  },
  {
    key: 'friday',
    label: 'Friday',
  },
  {
    key: 'saturday',
    label: 'Saturday',
  },
  {
    key: 'sunday',
    label: 'Sunday',
  },
];

export const getColumns = (onDeleteHandler: Function): ProColumns[] => [
  {
    title: 'Serial Number',
    dataIndex: 'key',
    width: 50,
    editable: false,
    align: 'center',
  },
  {
    title: 'Start Time',
    dataIndex: 'startTime',
    valueType: 'time',
    width: 160,
    align: 'center',
  },
  {
    title: 'End Time',
    dataIndex: 'endTime',
    valueType: 'time',
    width: 160,
    align: 'center',
  },
  {
    title: 'Action',
    valueType: 'option',
    width: 150,
    align: 'center',
    render: (text, record, _, action) => (
      <Space>
        <a
          key="edit"
          onClick={() => {
            action?.startEditable(record.key || '');
          }}
        >
          Edit
        </a>
        <Popconfirm
          title="Alert"
          description="Are you sure you want to delete it?"
          onConfirm={() => onDeleteHandler(record.key)}
        >
          <a
            key="delete"
          >
            Delete
          </a>
        </Popconfirm>
      </Space>
    ),
  },
];

export const isWorkDay = (day: string) => ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].includes(day);

export const getMaxKey = (orderTime: IOrderTime[] | undefined): number => {
  const keys = orderTime?.map((item) => item.key) || [];

  if (keys.length === 0) {
    return 0;
  }
  return Math.max(...keys);
};
