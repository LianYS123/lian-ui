import React from 'react';
import { Form, Modal, Input } from 'antd';

export const BaseForm = ({ onCancel, wrapperProps, onSubmit }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} onFinish={onSubmit}>
      <Modal {...wrapperProps} onOk={() => form.submit()} onCancel={onCancel}>
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
