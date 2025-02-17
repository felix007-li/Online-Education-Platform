import { useDownLoad } from './hooks';
import style from './index.module.less';

interface IProps {
  hasMore: boolean;
  loadMore: () => Promise<unknown>;
}

/**
* Infinite Scroll component
*/
const InfiniteScroll = ({
  hasMore,
  loadMore,
}: IProps) => {
  const { tips } = useDownLoad({
    hasMore,
    loadMore,
  });
  return (
    <div className={style.container}>
      {hasMore ? tips : 'No more data'}
    </div>
  );
};

export default InfiniteScroll;
