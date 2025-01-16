import { ICourse } from '@/utils/types';
import { ProColumns } from '@ant-design/pro-components';
import { Button, Space } from 'antd';

interface IProps {
  onEditHandler: (id: string) => void
  // onOrderTimeHandler: (id: string) => void
  // onCardHandler: (id: string) => void
}

export const getColumns: ({
  onEditHandler,
  // onOrderTimeHandler,
  // onCardHandler,
}: IProps) => ProColumns<ICourse, 'text'>[] = ({
  onEditHandler,
  // onOrderTimeHandler,
  // onCardHandler,
}) => [
  {
    title: 'Course Title',
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: 'Limit Number',
    dataIndex: 'limitNumber',
    width: 125,
    search: false,
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    width: 75,
    search: false,
  },
  {
    title: 'Action',
    valueType: 'option', 
    dataIndex: 'id',
    align: 'center',
    width: 300,
    render: (text, entity) => (
      <Space>
        <Button
          key="edit"
          type="link"
          onClick={() => onEditHandler(entity.id)}
        >
          Edit
        </Button>
        {/* <Button
          key="orderTime"
          type="link"
          onClick={() => onOrderTimeHandler(entity.id)}
        >
          Available Time
        </Button>
        <Button
          key="card"
          type="link"
          onClick={() => onCardHandler(entity.id)}
        >
          Associated consumption card
        </Button> */}
      </Space>
    ),
  },
];
