import React from 'react';
import { notification, Modal } from 'antd';
import { modalMounter } from './mounter';

// 结果处理器
export const resolveResult = async ({
  method,
  reload,
  params = {},
  message
}) => {
  const res = await method(params);
  if (res && res.code === '0000') {
    if (message) {
      notification.success({ message });
    }
    if (reload) {
      reload();
    }
  }
  return res;
};

export const mount = ({
  CustomForm,
  options,
  mounter = modalMounter,
  ...wrapperProps
}) => {
  const { record } = options;
  const { open, close } = mounter;
  const content = (
    <CustomForm
      wrapperProps={{
        ...wrapperProps,
        visible: true,
        onClose: close,
        onCancel: close
      }}
      initialValues={record}
      {...options}
      close={close}
    />
  );
  open(content);
};

// 自定义表单
export function mountForm({
  CustomForm,
  options,
  method,
  message,
  mounter = modalMounter,
  onSubmit = resolveResult,
  ...wrapperProps
}) {
  const { reload, record } = options;
  const { open, close } = mounter;
  const content = (
    <CustomForm
      wrapperProps={{
        ...wrapperProps,
        visible: true,
        onClose: close,
        onCancel: close
      }}
      initialValues={record}
      {...options}
      method={
        onSubmit
          ? (params) => onSubmit({ method, message, reload, params })
          : method
      }
      close={close}
    />
  );

  open(content);
}

export const confirmAction = ({
  method,
  reload,
  message,
  params,
  onSubmit = resolveResult,
  ...modalProps
}) => {
  Modal.confirm({
    ...modalProps,
    onOk: () =>
      onSubmit({
        method,
        reload,
        message,
        params
      })
  });
};
