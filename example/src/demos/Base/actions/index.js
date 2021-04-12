import { mountForm, confirmAction, mount, drawerMounter } from 'lian-ui';
import { BaseForm } from './BaseForm';
import { UserDetail } from './UserDetail';
import { fakeDelete, fakeUpdate } from 'service';

const actions = {
  edit: (options) => {
    mountForm({
      CustomForm: BaseForm,
      options,
      title: '编辑',
      message: '操作成功',
      method: fakeUpdate
    });
  },
  del: ({ reload, record }) => {
    confirmAction({
      title: '确认删除？',
      method: fakeDelete,
      reload,
      message: '删除成功',
      params: { id: record.id }
    });
  },
  detail: (options) => {
    mount({
      title: '详情',
      CustomForm: UserDetail,
      width: 500,
      options,
      mounter: drawerMounter
    });
  }
};

export default actions;
