import { Grid, Image, List } from 'antd-mobile';
import { BankcardOutline, FaceRecognitionOutline, UnorderedListOutline } from 'antd-mobile-icons';
import { useUserContext } from '@/hooks/userHooks';
import { useGoTo } from '@/hooks';
import { ROUTE_KEY } from '@/routes/menus';
import style from './index.module.less';

/**
* My page
*/
const My = () => {
  const { store } = useUserContext();
  const { go } = useGoTo();
  return (
    <div className={style.container}>
      <Grid columns={10} className={style.card}>
        <Grid.Item span={4}>
          <Image
            className={style.avatar}
            src={store.avatar}
            alt="avatar"
          />
        </Grid.Item>
        <Grid.Item span={6}>
          <div className={style.name}>
            {store.name}
          </div>
          <div
            className={style.edit}
            onClick={() => go(ROUTE_KEY.EDIT_INFO)}
          >
            Edit info
          </div>
        </Grid.Item>
      </Grid>
      <List className={style.list}>
        <List.Item
          prefix={<FaceRecognitionOutline />}
          onClick={() => go(ROUTE_KEY.ORDER_COURSE)}
        >
          Book courses
        </List.Item>
        <List.Item
          prefix={<UnorderedListOutline />}
          onClick={() => go(ROUTE_KEY.MY_COURSE)}
        >
          My Courses
        </List.Item>
        <List.Item
          prefix={<BankcardOutline />}
          onClick={() => go(ROUTE_KEY.MY_CARD)}
        >
          My cards
        </List.Item>
      </List>
    </div>
  );
};

export default My;
