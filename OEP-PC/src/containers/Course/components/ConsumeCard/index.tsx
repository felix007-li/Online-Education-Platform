import { Drawer } from 'antd';
import { EditableProTable } from '@ant-design/pro-components';
import { ICard } from '@/utils/types';
import { useCards, useDeleteCard, useEditCardInfo } from '@/services/card';
import { getColumns } from './constants';

interface IProps {
  id: string;
  onClose: (isReload?: boolean) => void;
}

/**
* Concume Card
*/
const ConsumeCard = ({
  onClose,
  id,
}: IProps) => {
  const { data, loading, refetch } = useCards(id);
  const [del, delLoading] = useDeleteCard();
  const [edit, editLoading] = useEditCardInfo();

  const onDeleteHandler = (key: string) => {
    del(key, refetch);
  };
  const onSaveHandler = (d: ICard) => {
    edit(d.id, id, { 
      name: d.name,
      type: d.type,
      time: d.time,
      validityDay: d.validityDay,
    }, refetch);
  };
  return (
    <Drawer
      title="Associated consume card"
      width="90vw"
      open
      onClose={() => onClose()}
    >
      <EditableProTable<ICard>
        headerTitle="Please manage your consume card for this course"
        rowKey="id"
        loading={loading || editLoading || delLoading}
        recordCreatorProps={{
          record: () => ({
            id: 'new',
            name: '',
            type: 'time',
            time: 0,
            validityDay: 0,
          }),
        }}
        value={data}
        columns={getColumns(onDeleteHandler)}
        editable={{
          onSave: async (rowKey, d) => {
            onSaveHandler(d);
          },
          onDelete: async (key) => {
            onDeleteHandler(key as string);
          },
        }}
      />
    </Drawer>
  );
};

export default ConsumeCard;
