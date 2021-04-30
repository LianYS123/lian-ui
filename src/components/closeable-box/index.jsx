import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import './styles.less';

// 可展开的信息展示
export const CloseableBox = ({
  title,
  children,
  className,
  style,
  underline = true
}) => {
  const [visable, setVisable] = useState(true);
  return (
    <div
      className={classNames(className, 'l-closeable-box', {
        underline
      })}
      style={style}
    >
      <Row
        onClick={() => setVisable((v) => !v)}
        className='modal-header'
        justify='space-between'
      >
        <Col className='modal-title' span={12}>
          {title}
        </Col>
        <Col className='modal-icon' span={12}>
          {visable ? <UpOutlined /> : <DownOutlined />}
        </Col>
      </Row>
      {visable ? children : null}
    </div>
  );
};

export default CloseableBox;
