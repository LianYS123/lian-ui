import React from 'react';
import { notification } from 'antd';
import Mounter from 'components/mounter';

const mounter = new Mounter('m1');

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
export function mount(
  CustomForm,
  {
    options,
    method,
    message,
    pop = mounter,
    onSubmit = resolveResult,
    ...wrapperProps
  }
) {
  const { reload, record } = options;
  Object.assign(wrapperProps, { visable: true });
  const content = (
    <CustomForm
      wrapperProps={wrapperProps}
      initialValues={record}
      {...options}
      onSubmit={(params) => onSubmit({ method, message, reload, params })}
      onCancel={pop.close}
    />
  );

  pop.open(content);
}
