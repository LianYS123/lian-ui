import React from 'react';
import { Table } from 'antd';
import { useTable, useModalAction } from 'lian-hooks';
import { confirmAction, ActionControl } from 'lian-ui';
import { getFakeUsers, fakeDelete, fakeUpdate, fakeAdd } from 'service';
import { getColumns } from './config';
import { BaseForm } from './actions/BaseForm';
import { UserDetail } from './actions/UserDetail';

const del = ({ reload, record }) => {
  confirmAction({
    title: '确认删除？',
    method: fakeDelete,
    reload,
    message: '删除成功',
    params: { id: record.id }
  });
};

export const Base = () => {
  const { tableProps } = useTable({
    method: getFakeUsers
  });
  const { open: add, ...addProps } = useModalAction();
  const { open: edit, ...editProps } = useModalAction();
  const { open: detail, ...detailProps } = useModalAction();
  const columns = getColumns({ actions: { edit, detail, del } });
  return (
    <>
      <ActionControl
        actions={{ add }}
        style={{ marginBottom: '1em' }}
        options={[
          {
            title: '新增',
            type: 'primary',
            command: 'add'
          }
        ]}
      />
      <Table rowKey='id' columns={columns} {...tableProps} />
      <BaseForm method={fakeUpdate} title='编辑' {...editProps} />
      <BaseForm method={fakeAdd} title='新增' {...addProps} />
      <UserDetail title='用户详情' {...detailProps} />
    </>
  );
};
