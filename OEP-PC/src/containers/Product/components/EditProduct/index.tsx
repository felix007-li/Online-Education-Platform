import {
  Button,
  Col,
  Divider,
  Drawer, Form, Input, InputNumber, Row, Space, Spin,
} from 'antd';
import { useState } from 'react';
import UploadImage from '@/components/OSSImageUpload';
import { useEditProductInfo, useProductInfo } from '@/services/product';
import TypeSelect from '@/components/TypeSelect';

const { TextArea } = Input;

interface IProps {
  id?: string;
  onClose: (isReload?: boolean) => void;
}

/**
  * Create/Edit Product
  */
const EditCourse = ({
  onClose,
  id,
}: IProps) => {
  const [form] = Form.useForm();
  const [edit, editLoading] = useEditProductInfo();
  const { data, loading } = useProductInfo(id);
  const [open, setOpen] = useState(true);

  const onSubmitHandler = async () => {
    const values = await form.validateFields();
    if (values) {
      const newValues = {
        ...values,
        coverUrl: values.coverUrl[0].url,
        bannerUrl: values.bannerUrl[0].url,
      };
      edit(id, newValues, onClose);
    }
  };

  return (
      <Drawer
        title={id ? 'Edit Product' : 'Create Product'}
        width={980}
        open={open}
        onClose={() => setOpen(false)}
        // eslint-disable-next-line max-len
        afterOpenChange={(o) => !o && onClose()} // When the drawer is closed, call the onClose method
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
          {(data || !id) && (
          <Form
            form={form}
            initialValues={data}
          >
            <Row gutter={20}>
              <Col span={15}>
                <Form.Item
                  style={{ width: '100%' }}
                  label="Name"
                  name="name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={9}>
                <Form.Item
                  label="Type of product"
                  name="type"
                  rules={[{ required: true }]}
                >
                  <TypeSelect />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={4}>
                <Form.Item
                  label="Stock"
                  name="stock"
                  rules={[{ required: true }]}
                >
                  <InputNumber />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Original Price"
                  name="originalPrice"
                  rules={[{ required: true }]}
                >
                  <InputNumber />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Preferential Price"
                  name="preferentialPrice"
                  rules={[{ required: true }]}
                >
                  <InputNumber />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Limit number of purchases"
                  name="limitBuyNumber"
                  rules={[{ required: true }]}
                >
                  <InputNumber />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Description"
              name="desc"
              rules={[{ required: true }]}
            >
              <TextArea
                maxLength={180}
                rows={5}
                allowClear
                showCount
              />
            </Form.Item>
            <Divider>Cover Image</Divider>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  name="coverUrl"
                  label="Product Cover Image: Image aspect ratio requirement is 16:9"
                  rules={[{ required: true }]}
                  labelCol={{
                    span: 24, //
                  }}
                >
                  <UploadImage
                    maxCount={1}
                    imgCropAspect={16 / 9}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="bannerUrl"
                  label="Product Banner Image: Image aspect ratio requirement is 16:9"
                  rules={[{ required: true }]}
                  labelCol={{
                    span: 24,
                  }}
                >
                  <UploadImage
                    maxCount={1}
                    imgCropAspect={16 / 9}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          )}
        </Spin>
      </Drawer>
  );
};

EditCourse.defaultProps = {
  id: '',
};

export default EditCourse;
