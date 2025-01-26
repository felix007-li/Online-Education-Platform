import { ProColumns } from '@ant-design/pro-components';
import {
  Image, Popconfirm, Space,
} from 'antd';
import { IProduct } from '@/utils/types';

interface IProps {
  onEditHandler: (id: string) => void;
  onCardHandler: (id: string) => void;
  onDeleteHandler: (id: string) => void;
  onStatusChangeHandler: (id: string, status: string) => void;
}

const PRODUCT_STATUS = {
  LIST: 'LIST',
  UN_LIST: 'UN_LIST',
};

export const getColumns: (props: IProps) => ProColumns<IProduct, 'text'>[] = ({
  onEditHandler,
  onCardHandler,
  onDeleteHandler,
  onStatusChangeHandler,
}) => [
  {
    dataIndex: 'id',
    title: '#',
    valueType: 'indexBorder',
    search: false,
    align: 'center',
    width: 50,
  },
  {
    title: 'Cover',
    dataIndex: 'coverUrl',
    search: false,
    align: 'center',
    width: 100,
    render: (_, record: IProduct) => <Image src={record.coverUrl} />,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: 300,
    copyable: true,
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: 'Name is required',
        },
      ],
    },
  },
  {
    title: 'Original price',
    search: false,
    dataIndex: 'originalPrice',
    width: 120,
  },
  {
    title: 'Preferential Price',
    search: false,
    dataIndex: 'preferentialPrice',
    width: 120,
  },
  {
    title: 'Stock',
    search: false,
    width: 80,
    align: 'center',
    dataIndex: 'stock',
  },
  {
    title: 'Current Stock',
    search: false,
    width: 80,
    align: 'center',
    dataIndex: 'curStock',
  },
  {
    title: 'Limit number of purchases',
    search: false,
    width: 120,
    align: 'center',
    dataIndex: 'limitBuyNumber',
  },
  {
    title: 'Sales',
    search: false,
    width: 50,
    align: 'center',
    dataIndex: 'buyNumber',
  },
  {
    title: 'Actions',
    valueType: 'option',
    dataIndex: 'id',
    align: 'center',
    width: 300,
    render: (text, entity) => (
      <Space>
        {entity.status === PRODUCT_STATUS.UN_LIST
          ? (
            <a
              key="list"
              style={{
                color: 'blue',
              }}
              onClick={() => onStatusChangeHandler(entity.id, PRODUCT_STATUS.LIST)}
            >
              Putaway
            </a>
          )
          : (
            <a
              key="unList"
              style={{
                color: 'green',
              }}
              onClick={() => onStatusChangeHandler(entity.id, PRODUCT_STATUS.UN_LIST)}
            >
              Remove
            </a>
          )}
        <a
          key="edit"
          onClick={() => onEditHandler(entity.id)}
        >
          Edit
        </a>
        <a
          key="card"
          onClick={() => onCardHandler(entity.id)}
        >
          Bind Consume Card
        </a>
        <Popconfirm
          title="Alert"
          description="Are you sure you want to delete this product?"
          onConfirm={() => onDeleteHandler(entity.id)}
        >
          <a
            key="delete"
            type="link"
            style={{
              color: 'red',
            }}
          >
            Delete
          </a>
        </Popconfirm>
      </Space>
    ),
  },
];
