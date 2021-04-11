import React from 'react';
import { notification } from 'antd';
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
};

// 自定义表单
export function mount({
  CustomForm,
  options,
  method,
  message,
  mounter = modalMounter,
  onSubmit = resolveResult,
  ...wrapperProps
}) {
  const { reload, record } = options;
  Object.assign(wrapperProps, { visible: true, onCancel: mounter.close });
  const content = (
    <CustomForm
      wrapperProps={wrapperProps}
      initialValues={record}
      {...options}
      onSubmit={(params) => onSubmit({ method, message, reload, params })}
      close={mounter.close}
    />
  );

  mounter.open(content);
}
