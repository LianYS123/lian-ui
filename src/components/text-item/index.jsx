import React from 'react';
import { Row, Col } from 'antd';
import './styles.module.less';
import classNames from 'classnames';

export const TextItem = ({
  label,
  labelCol = { span: 6 },
  wrapperCol = { span: 18 },
  colon = true,
  children,
  style,
  className
}) => {
  return (
    <Row className={classNames('text-item', className)} style={style}>
      <Col className='label' {...labelCol}>
        <span>
          {label}
          {colon && ':'}
        </span>
      </Col>
      <Col {...wrapperCol}>{children}</Col>
    </Row>
  );
};
export default TextItem;
