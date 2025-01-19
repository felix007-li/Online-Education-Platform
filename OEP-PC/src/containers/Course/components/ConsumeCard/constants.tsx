import { CARD_TYPE } from '@/utils/constants';
import { ProColumns } from '@ant-design/pro-components';
import { Popconfirm, Space } from 'antd';

export const getColumns = (onDeleteHandler: Function): ProColumns[] => [
  {
    title: 'Serial Number',
    dataIndex: 'key',
    width: 50,
    editable: false,
    align: 'center',
    render: (d, r, index) => index + 1,
  },
  {
    title: 'Title',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: 'Validity period (days)',
    dataIndex: 'validityDay',
    valueType: 'digit',
    width: 110,
    align: 'center',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    valueType: 'select',
    width: 120,
    align: 'center',
    request: async () => [
      {
        value: CARD_TYPE.TIME,
        label: 'Secondary Card',
      },
      {
        value: CARD_TYPE.DURATION,
        label: 'Duration Card',
      },
    ],
  },
  {
    title: 'Frequency',
    dataIndex: 'time',
    valueType: 'digit',
    width: 100,
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
            action?.startEditable(record.id || '');
          }}
        >
          编辑
        </a>
        <Popconfirm
          title="Alert"
          description="Are you sure you want to delete it?"
          onConfirm={() => onDeleteHandler(record.id)}
        >
          <a
            key="delete"
          >
            删除
          </a>
        </Popconfirm>
      </Space>
    ),
  },
];
