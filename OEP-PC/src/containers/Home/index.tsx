import { PageContainer } from '@ant-design/pro-components';
import {
  Button, Calendar, Card, Col, DatePicker, Row, message,
} from 'antd';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useOrganization } from '@/services/org';
import { useUserContext } from '@/hooks/userHooks';
import { DAY_FORMAT } from '@/utils/constants';
import { useAutoCreateSchedule } from '@/services/dashboard';
import style from './index.module.less';
import Schedule from './components/Schedule';

const { RangePicker } = DatePicker;

/**
*
*/
const Home = () => {
  const [range, setRange] = useState<[string, string]>(['', '']);
  const { store } = useUserContext();
  const { data: org } = useOrganization(store.currentOrg || '');
  const [run, loading] = useAutoCreateSchedule();
  const [day, setDay] = useState<string>(dayjs().format(DAY_FORMAT));
  if (!org) {
    return null;
  }

  const startScheduleHandler = () => {
    if (!range[0]) {
      message.error('Please select a time range');
      return;
    }
    run(...range);
  };

  const onRangeChangeHandler = (days: [Dayjs | null, Dayjs | null] | null) => {
    if (!days || !days[0] || !days[1]) {
      return;
    }
    setRange([days[0].format(DAY_FORMAT), days[1].format(DAY_FORMAT)]);
  };
  return (
    <div className={style.container}>
      <PageContainer
        content={org.address}
        header={{
          title: org.name,
        }}
      >
        <Row gutter={20}>
          <Col flex="auto">
            <Card
              title={`${day} course`}
              className={style.container}
              extra={
            (
              <span>
                <RangePicker onChange={(days) => onRangeChangeHandler(days)} />
                <Button
                  loading={loading}
                  type="link"
                  onClick={startScheduleHandler}
                >
                  Start scheduling classes
                </Button>
              </span>
            )
          }
            >
              <Schedule day={day} />
            </Card>
          </Col>
          <Col flex="450px">
            <Calendar
              fullscreen={false}
              onChange={(d) => setDay(d.format(DAY_FORMAT))}
            />
          </Col>
        </Row>
      </PageContainer>
    </div>
  );
};

export default Home;
