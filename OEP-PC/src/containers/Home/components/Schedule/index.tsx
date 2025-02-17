import { useSchedules } from '@/services/dashboard';
import {
  Avatar, Descriptions, Result, Space, Spin, Steps, Tooltip,
} from 'antd';
import { SCHEDULE_STATUS } from '@/utils/constants';
import style from './index.module.less';

interface IProps {
  day: string
}

/**
* Schedule for the day
*/
const Schedule = ({
  day,
}: IProps) => {
  const { data, loading } = useSchedules(day);

  if (data?.length === 0) {
    return (
      <Result
        status="warning"
        title="There are currently no classes scheduled. Go and schedule a class."
      />
    );
  }

  return (
    <Spin spinning={loading} className={style.container}>
      <Steps
        direction="vertical"
        items={
          data?.map((item) => ({
            title: `${item.startTime}-${item.endTime} ${item.course.name}`,
            description: (
              <Descriptions bordered size="small">
                <Descriptions.Item
                  span={3}
                  label="Teacher"
                >
                  <Space>
                    {
                    item.course.teachers.map((teacher) => (
                      <Space key={teacher.id}>
                        <Avatar
                          shape="square"
                          size="small"
                          src={teacher.photoUrl}
                        />
                        {teacher.name}
                      </Space>
                    ))
                  }
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item
                  span={3}
                  label={`Student(${item.scheduleRecords.length})`}
                  labelStyle={{
                    width: 80,
                  }}
                >
                  {item.scheduleRecords.length === 0 && 'There are currently no student reservations'}
                  <Avatar.Group
                    maxCount={10}
                    maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                  >
                    {
                    item.scheduleRecords.map((sr) => (
                      <Tooltip
                        key={sr.id}
                        title={sr.student.name + (sr.status === SCHEDULE_STATUS.CANCEL ? 'Canceled' : '')}
                      >
                        <Avatar
                          key={sr.student.id}
                          src={sr.student.avatar}
                        />
                      </Tooltip>
                    ))
                  }
                  </Avatar.Group>
                </Descriptions.Item>
              </Descriptions>
            ),
          }))
        }
      />
    </Spin>
  );
};

export default Schedule;
