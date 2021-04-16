import React from 'react';
import { Form, Modal, Input } from 'antd';
import { useMutation } from 'lian-hooks';
import { layout } from '../config';

export const BaseForm = ({ method, record, visible, close, ...rest }) => {
  const [form] = Form.useForm();
  const [load, { loading }] = useMutation(method);
  return (
    visible && (
      <Modal
        destroyOnClose
        onCancel={close}
        visible={visible}
        {...rest}
        confirmLoading={loading}
        onOk={() => {
          form.submit();
        }}
      >
        <Form
          form={form}
          {...layout}
          initialValues={record}
          onFinish={async (params) => {
            await load(params);
            close();
          }}
        >
          <Form.Item label='姓名' name='username'>
            <Input placeholder='请输入...' />
          </Form.Item>
          <Form.Item label='性别' name='sex'>
            <Input placeholder='请输入...' />
          </Form.Item>
        </Form>
      </Modal>
    )
  );
};
