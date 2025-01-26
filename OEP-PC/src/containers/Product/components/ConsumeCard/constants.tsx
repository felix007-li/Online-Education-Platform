import { CARD_TYPE } from '@/utils/constants';
import { ProColumns } from '@ant-design/pro-components';
import { Popconfirm, Space } from 'antd';

export const getColumns = (onDeleteHandler: Function): ProColumns[] => [
  {
    title: 'Number',
    dataIndex: 'key',
    width: 50,
    editable: false,
    align: 'center',
    render: (d, r, index) => index + 1,
  },
  {
    title: 'Name',
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
    width: 130,
    align: 'center',
    request: async () => [
      {
        value: CARD_TYPE.TIME,
        label: 'Frequency card',
      },
      {
        value: CARD_TYPE.DURATION,
        label: 'Duration card',
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
          Edit
        </a>
        <Popconfirm
          title="Alert"
          description="Are you sure you want to delete this card?"
          onConfirm={() => onDeleteHandler(record.id)}
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
