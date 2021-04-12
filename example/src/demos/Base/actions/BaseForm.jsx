import React from 'react';
import { Form, Modal, Input } from 'antd';
import { useMutation } from 'lian-hooks';
import { layout } from '../config';

export const BaseForm = ({ method, wrapperProps, close }) => {
  const [form] = Form.useForm();
  const [load, { loading }] = useMutation(method);
  return (
    <Form
      form={form}
      {...layout}
      onFinish={async (params) => {
        await load(params);
        close();
      }}
    >
      <Modal
        {...wrapperProps}
        confirmLoading={loading}
        onOk={() => form.submit()}
      >
        <Form.Item label='姓名' name='username'>
          <Input placeholder='请输入...' />
        </Form.Item>
        <Form.Item label='性别' name='sex'>
          <Input placeholder='请输入...' />
        </Form.Item>
      </Modal>
    </Form>
  );
};
