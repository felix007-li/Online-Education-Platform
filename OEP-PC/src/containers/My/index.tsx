import {
  PageContainer, ProForm, ProFormInstance, ProFormText, ProFormTextArea,
} from '@ant-design/pro-components';
import { useMutation } from '@apollo/client';
import {
  Col, Row, message, Form,
} from 'antd';
import { useEffect, useRef } from 'react';
import { useGetUser, useUserContext } from '@/hooks/userHooks';
import { UPDATE_USER } from '@/graphql/user';
import OSSImageUpload from '@/components/OssImageUpload';

/**
* personal information manager
*/
const My = () => {
  const formRef = useRef<ProFormInstance>();
  const { store } = useUserContext();
//   const { store } = useGetUser()

  const [updateUserInfo] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (!store.tel) return;
    formRef.current?.setFieldsValue({
      tel: store.tel,
      name: store.name,
      desc: store.desc,
      avatar: [{
        url: store.avatar,
      }],
    });
  }, [store]);
  return (
    <PageContainer>
      <ProForm
        formRef={formRef}
        layout="horizontal"
        submitter={{
          resetButtonProps: {
            style: {
              display: 'none',
            },
          },
        }}
        onFinish={async (values) => {
          const res = await updateUserInfo({
            variables: {
              id: store.id,
              params: {
                name: values.name,
                desc: values.desc,
                avatar: values.avatar[0]?.url || '',
              },
            },
          });
          if (res.data.updateUserInfo.code === 200) {
            store.refetchHandler?.();
            message.success(res.data.updateUserInfo.message);
            return;
          }
          message.error(res.data.updateUserInfo.message);
        }}
      >
        <Row gutter={20}>
          <Col>
            <ProFormText
              name="tel"
              label="tel"
              tooltip="can not modify"
              disabled
            />
            <ProFormText
              name="name"
              label="nick name"
              placeholder="Please enter a nickname"
            />
            <ProFormTextArea
              name="desc"
              label="desc"
              placeholder="Please enter brief information"
            />
          </Col>
          <Col>
            <Form.Item name="avatar">
              <OSSImageUpload label="Change avatar" />
            </Form.Item>
          </Col>
        </Row>
      </ProForm>
    </PageContainer>
  );
};

export default My;
