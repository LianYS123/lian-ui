import React from 'react';
import { Drawer } from 'antd';
import { CloseableBox, TextItemGroup, ActionControl } from 'lian-ui';
import { getColumns, layout } from '../config';

export const UserDetail = ({ wrapperProps, record, close }) => {
  const columns = getColumns().filter((it) => it.key !== 'opt');
  return (
    <Drawer
      {...wrapperProps}
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
