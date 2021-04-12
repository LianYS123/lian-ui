import { TableCellControl } from 'lian-ui';
import actions from './actions';

export const getColumns = () => {
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
            title: '详情',
            command: 'detail'
          },
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
            actions={actions}
          />
        );
      }
    }
  ];
  return columns;
};

export const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};