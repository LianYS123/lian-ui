import React, { useState, useEffect, useCallback } from 'react';
import { Table } from 'antd';
import { TableCellControl } from 'lian-ui';
import actions from './actions';
const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));

const fakeDataSource = [
  {
    id: 1,
    username: 'lian',
    sex: 'male'
  }
];

const useFakeRequest = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setSource] = useState([]);
  const load = useCallback(async () => {
    setLoading(true);
    await delay(1000);
    setLoading(false);
    setSource(fakeDataSource);
  }, []);
  useEffect(() => {
    load();
  }, [load]);
  return { loading, dataSource, reload: load };
};

export const Base = () => {
  const { loading, dataSource } = useFakeRequest();
  const execAction = (command, opts) => {
    actions[command](opts);
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: '姓名',
      dataIndex: 'username'
    },
    {
      title: '性别',
      dataIndex: 'sex'
    },
    {
      key: 'opt',
      title: '操作',
      render: (record) => {
        const options = [
          {
            title: '编辑',
            command: 'edit'
          },
          {
            title: '删除',
            command: 'del',
            danger: true
          }
        ];
        return (
          <TableCellControl
            options={options}
            record={record}
            execCommand={execAction}
          />
        );
      }
    }
  ];
  return <Table rowKey='id' loading={loading} columns={columns} dataSource={dataSource} />;
};
