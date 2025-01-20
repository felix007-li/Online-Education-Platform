import {
    Button,
    Col, Divider, Drawer, Form, Input, Row, Select, Spin, UploadFile,
  } from 'antd';
  import UploadImage from '@/components/OSSImageUpload';
  import { useOrganization, useEditInfo } from '@/services/org';
  import { useMemo } from 'react';
  import { IOrganization } from '@/utils/types';
  import style from './index.module.less';
  
  interface IProp {
    id: string;
    onClose: () => void;
  }
  /**
  *
  */
  const EditOrg = ({
    id,
    onClose,
  }: IProp) => {
    const [form] = Form.useForm();
  
    const { data, loading: queryLoading } = useOrganization(id);
    const [edit, editLoading] = useEditInfo();
    const onFinishHandler = async () => { 
      const values = await form.validateFields();
      if (values) {
        const formData = {
          ...values,
          logo: values.logo[0].url, // first logo
          tags: values.tags.join(','),
          identityCardBackImg: values.identityCardBackImg ? values.identityCardBackImg[0].url : '',
          identityCardFrontImg: values.identityCardFrontImg ? values.identityCardFrontImg[0].url : '',
          businessLicense: values.businessLicense[0].url,
          orgFrontImg: values?.orgFrontImg?.map((item: UploadFile) => ({ url: item.url })),
          orgRoomImg: values?.orgRoomImg?.map((item: UploadFile) => ({ url: item.url })),
          orgOtherImg: values?.orgOtherImg?.map((item: UploadFile) => ({ url: item.url })),
        } as IOrganization;
        edit(id, formData);
      }
    };
  
    const initValue = useMemo(() => (data ? {
      ...data,
      tags: data.tags?.split(','),
      logo: [{ url: data.logo }],
      identityCardBackImg: [{ url: data.identityCardBackImg ? data.identityCardBackImg : '' }],
      identityCardFrontImg: [{ url: data.identityCardFrontImg ?  data.identityCardFrontImg : '' }],
      businessLicense: [{ url: data.businessLicense }],
    } : {}), [data]);
  
    if (queryLoading) {
      return <Spin />;
    }
  
    return (
      <Drawer
        title="Edit Store Information"
        width="70vw"
        onClose={onClose}
        open
        footerStyle={{ textAlign: 'right' }}
        footer={(
          <Button
            loading={editLoading}
            type="primary"
            onClick={onFinishHandler}
          >
            Save
          </Button>
        )}
      >
        <Form form={form} initialValues={initValue} layout="vertical">
          <Row className={style.row} gutter={20}>
            <Col span={10}>
              <Form.Item
                style={{ width: '100%' }}
                label="Logo"
                name="logo"
                rules={[{ required: true }]}
              >
                <UploadImage
                  maxCount={1}
                  label="Change Logo"
                />
              </Form.Item>
            </Col>
            <Col span={14}>
              <Form.Item
                style={{ width: '100%' }}
                label="Name"
                name="name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Please enter store name" />
              </Form.Item>
            </Col>
          </Row>
          <Row className={style.row} gutter={20}>
            <Col span={11}>
              <Form.Item
                label="Tags"
                name="tags"
                rules={[{ required: true }]}
              >
                <Select
                  mode="tags"
                  style={{ width: '100%' }}
                  placeholder="Please enter tag"
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                label="Mobile phone"
                name="tel"
                rules={[{ required: true }]}
              >
                <Input placeholder="Please enter mobile phone number" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                label="Longitude"
                name="longitude"
                rules={[{ required: true }]}
              >
                <Input placeholder="Please enter longitude" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                label="Latitude"
                name="latitude"
                rules={[{ required: true }]}
              >
                <Input placeholder="Please enter latitude" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true }]}
          >
            <Input placeholder="Please enter address" />
          </Form.Item>
          <Form.Item
            label="Store Description"
            name="description"
            rules={[{ required: true }]}
          >
            <Input.TextArea
              maxLength={500}
              rows={5}
              className={style.textArea}
              allowClear
              showCount
            />
          </Form.Item>
          <Row className={style.row} gutter={20}>
            <Col span={8}>
              <Form.Item
                style={{ width: '100%' }}
                label="License"
                name="businessLicense"
                rules={[{ required: true }]}
              >
                <UploadImage
                  label="Change License"
                  maxCount={1}
                  imgCropAspect={3 / 2}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                style={{ width: '100%' }}
                label="Identity Card Front Image"
                name="identityCardFrontImg"
              >
                <UploadImage
                  label="Change Identity Card"
                  maxCount={1}
                  imgCropAspect={3 / 2}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                style={{ width: '100%' }}
                label="Identity Card Back Image"
                name="identityCardBackImg"
              >
                <UploadImage
                  label="Change Identity Card"
                  maxCount={1}
                  imgCropAspect={3 / 2}
                />
              </Form.Item>
            </Col>
          </Row>
  
          <Divider>Store top image: The required image length-to-width ratio is 2:1, and a maximum of 5 images can be uploaded</Divider>
          <Form.Item name="orgFrontImg">
            <UploadImage maxCount={5} imgCropAspect={2 / 1} />
          </Form.Item>
          <Divider>Store interior pictures: The required ratio of picture length to width is 2:1, and a maximum of 5 pictures can be uploaded</Divider>
          <Form.Item name="orgRoomImg">
            <UploadImage maxCount={5} imgCropAspect={2 / 1} />
          </Form.Item>
          <Divider>Other pictures of the store: The required ratio of picture length to width is 2:1, and a maximum of 5 pictures can be uploaded</Divider>
          <Form.Item name="orgOtherImg">
            <UploadImage maxCount={5} imgCropAspect={2 / 1} />
          </Form.Item>
        </Form>
      </Drawer>
    );
  };
  
  export default EditOrg;
  