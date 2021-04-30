import React from 'react';
import { Button } from 'antd';
import classNames from 'classnames';
import './styles.less';

export const Control = ({
  className,
  style,
  options = [],
  actions,
  execCommand = (command, opts) => {
    actions[command](opts);
  },
  ...rest
}) => {
  return (
    <div style={style} className={className}>
      {options
        .filter((it) => !it.hidden)
        .map(({ title, onClick, command, ...btnProps }) => {
          return (
            <Button
              key={title}
              {...btnProps}
              onClick={() => {
                if (onClick) {
                  onClick(rest);
                } else if (command && execCommand) {
                  execCommand(command, rest);
                }
              }}
            >
              {title}
            </Button>
          );
        })}
    </div>
  );
};

export const TableCellControl = ({ className, options = [], ...props }) => (
  <Control
    className={classNames('l-table-cell-control', className)}
    options={options.map((it) => ({ ...it, type: 'link' }))}
    {...props}
  />
);

export const ActionControl = ({ className, ...props }) => (
  <Control
    className={classNames('l-action-control', className)}
    {...props}
  />
);
