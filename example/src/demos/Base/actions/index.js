import { mount, resolveResult } from 'utils/actions';
import BaseForm from './BaseForm';
import { Modal } from 'antd';
const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));
const fakeUpdate = async (values) => {
  delay(1000);
  console.log('update', values);
};
const fakeDelete = async (values) => {
  delay(1000);
  console.log('delete', values);
};

export default {
  edit: (options) => {
    mount(BaseForm, {
      options,
      title: '编辑',
      message: '操作成功',
      method: fakeUpdate
    });
  },
  del: ({ reload, record }) => {
    Modal.confirm({
      title: '确认删除？',
      onOk: () =>
        resolveResult({
          method: fakeDelete,
          reload,
          message: '删除成功',
          params: { id: record.id }
        })
    });
  }
};
