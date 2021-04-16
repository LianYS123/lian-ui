import React from 'react';
import { Drawer } from 'antd';
import { CloseableBox, TextItemGroup, ActionControl } from 'lian-ui';
import { getColumns, layout } from '../config';

export const UserDetail = ({ record, close, ...rest }) => {
  const columns = getColumns().filter((it) => it.key !== 'opt');
  return (
    <Drawer
      {...rest}
      width={550}
      onClose={close}
      footer={
        <ActionControl
          style={{ textAlign: 'right' }}
          options={[
            {
              title: '取消',
              command: 'close'
            },
            {
              title: '确认',
              type: 'primary',
              command: 'close'
            }
          ]}
          actions={{
            close
          }}
        />
      }
    >
      <CloseableBox title='用户信息'>
        <TextItemGroup
          style={{ marginBottom: '1em' }}
          {...layout}
          record={record}
          columns={columns}
        />
      </CloseableBox>
    </Drawer>
  );
};
