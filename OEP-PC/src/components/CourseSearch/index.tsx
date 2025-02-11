import { Select } from 'antd';
import _ from 'lodash';
import { useCoursesForSample } from '@/services/course';

interface IProps {
  onSelected?: (val: string) => void;
}
const CourseSearch = ({
  onSelected,
}: IProps) => {
  const { search, data, loading } = useCoursesForSample();

  const onSearchHandler = _.debounce((name: string) => {
    search(name);
  }, 500);

  const onChangeHandler = (val: string) => {
    onSelected?.(val);
  };

  return (
        <Select
            style={{ width: 200 }}
            placeholder="Please search course"
            showSearch
            onSearch={onSearchHandler}
            filterOption={false} // disable default filter
            onChange={onChangeHandler}
            loading={loading}
        >
            {data?.map((item) => (
                <Select.Option
                    key={item.id}
                    value={item.id}
                >
                    {item.name}
                </Select.Option>
            ))}
        </Select>
  );
};

export default CourseSearch;
