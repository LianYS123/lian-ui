import React from 'react';
import { Button } from 'antd';

export const TableCellControl = ({ options = [], execCommand, ...rest }) => {
  return (
    <div>
      {options
        .filter((it) => !it.hidden)
        .map(({ title, danger, onClick, command, disabled }) => {
          return (
            <Button
              style={{ padding: 0, marginRight: 8 }}
              key={title}
              danger={danger}
              disabled={disabled}
              type='link'
              onClick={() => {
                if (onClick) {
                  onClick(rest);
                }
                if (command && execCommand) {
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

export default TableCellControl;
