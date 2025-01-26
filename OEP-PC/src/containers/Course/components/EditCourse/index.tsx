import { useCourse, useEditCourseInfo } from '@/services/course';
import {
  Button,
  Col,
  Drawer, Form, Input, InputNumber, Row, Space, Spin,
} from 'antd';
import { useEffect } from 'react';
import UploadImage from '@/components/OSSImageUpload';
// import TeacherSelect from '@/components/TeacherSelect';
// import { ITeacher, IValue } from '@/utils/types';

const { TextArea } = Input;

interface IProps {
  id?: string;
  onClose: (isReload?: boolean) => void;
}

/**
* Create/Edit Course
  desc?: string;
  group?: string;
  baseAbility?: string;
  limitNumber: number; 
  duration: number;
  reserveInfo?: string;
  refundInfo?: string;
  otherInfo?: string;
*/
const EditCourse = ({
  onClose,
  id,
}: IProps) => {
  const [form] = Form.useForm();
  const [edit, editLoading] = useEditCourseInfo();
  const { getCourse, loading } = useCourse();

  useEffect(() => {
    const init = async () => {
      if (id) {
        const res = await getCourse(id);
        form.setFieldsValue({
          ...res,
        //   teachers: res.teachers ? res.teachers.map((item: ITeacher) => ({
        //     label: item.name,
        //     value: item.id,
        //   })) : [],
          coverUrl: res.coverUrl ? [{ url: res.coverUrl }] : [],
        });
      } else {
        form.resetFields();
      }
    };
    init();
  }, [id]);

  const onSubmitHandler = async () => {
    const values = await form.validateFields();
    if (values) {
      edit(id, {
        ...values,
        // teachers: values.teachers?.map((item: IValue) => item.value),
        coverUrl: values.coverUrl[0].url,
      }, onClose);
    }
  };

  return (
    <Drawer
      title={id ? 'Edit Course' : 'Create Course'}
      width={720}
      open
      onClose={() => onClose()}
      extra={(
        <Space>
          <Button onClick={() => onClose()}>Cancel</Button>
          <Button loading={editLoading} onClick={onSubmitHandler} type="primary">
            Submit
          </Button>
        </Space>
      )}
    >
      <Spin spinning={loading}>
        <Form
          form={form}
        >
          <Form.Item
            label="Profile"
            name="coverUrl"
            rules={[{
              required: true,
            }]}
          >
            <UploadImage imgCropAspect={2 / 1} />
          </Form.Item>
          <Form.Item
            label="Course Name"
            name="name"
            rules={[{
              required: true,
            }]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            label="Teacher"
            name="teachers"
            rules={[{
              required: true,
            }]}
          >
            <TeacherSelect />
          </Form.Item> */}
          <Form.Item
            label="Course Description"
            name="desc"
            rules={[{
              required: true,
            }]}
          >
            <TextArea rows={5} showCount maxLength={200} />
          </Form.Item>
          <Row gutter={20}>
            <Col>
              <Form.Item
                label="Limit Number"
                name="limitNumber"
                rules={[{
                  required: true,
                }]}
              >
                <InputNumber min={0} addonAfter="Number" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                label="Duration"
                name="duration"
                rules={[{
                  required: true,
                }]}
              >
                <InputNumber min={0} addonAfter="Min" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Group"
            name="group"
            rules={[{
              required: true,
            }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Basic Abilitity"
            name="baseAbility"
            rules={[{
              required: true,
            }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Reservation Information"
            name="reserveInfo"
            rules={[{
              required: true,
            }]}
          >
            <TextArea rows={5} showCount maxLength={200} />
          </Form.Item>
          <Form.Item
            label="Refund Information"
            name="refundInfo"
            rules={[{
              required: true,
            }]}
          >
            <TextArea rows={5} showCount maxLength={200} />
          </Form.Item>
          <Form.Item label="Other Information" name="otherInfo">
            <TextArea rows={5} showCount maxLength={200} />
          </Form.Item>
        </Form>
      </Spin>
    </Drawer>
  );
};

EditCourse.defaultProps = {
  id: '',
};

export default EditCourse;
