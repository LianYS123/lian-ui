import React from 'react';
import { Table } from 'antd';
import { useTable } from 'lian-hooks';
import { getFakeUsers } from 'service';
import { getColumns } from './config';

export const Base = () => {
  const { tableProps } = useTable({
    method: getFakeUsers
  });
  const columns = getColumns();
  return <Table rowKey='id' columns={columns} {...tableProps} />;
};
