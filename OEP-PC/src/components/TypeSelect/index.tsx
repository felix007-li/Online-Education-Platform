import { Select } from 'antd';
import { useProductTypes } from '@/services/product';

interface IProps {
  value?: string;
  onChange?: (val: string) => void;
}

/*
* Select product type
*/
const TypeSelect = ({
  value,
  onChange,
}: IProps) => {
  const { data } = useProductTypes();

  const onChangeHandler = (val: string) => {
    onChange?.(val);
  };

  return (
        <Select
            style={{ width: 200 }}
            placeholder="Please select a type"
            value={value}
            onChange={onChangeHandler}
        >
            {data?.map((item) => (
            <Select.Option
                key={item.key}
                value={item.key}
            >
                {item.title}
            </Select.Option>
            ))}
        </Select>
  );
};

TypeSelect.defaultProps = {
  value: undefined,
  onChange: () => {},
};

export default TypeSelect;
