import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { TableCellControl } from 'lian-ui';
import actions from './actions';
const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));

const useFakeRequest = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setSource] = useState([]);
  const fakeDataSource = [
    {
      id: 1,
      username: 'lian',
      sex: 'male'
    }
  ];
  const load = async () => {
    setLoading(true);
    await delay(1000);
    setLoading(false);
    setSource(fakeDataSource);
  };
  useEffect(() => {
    load();
  }, []);
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
  return <Table loading={loading} columns={columns} dataSource={dataSource} />;
};
