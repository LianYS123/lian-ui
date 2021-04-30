
import { useState, useCallback } from 'react';
import { useDeepCompareEffect } from '../util-hooks';

export const useRowSelection = (customConfig: any) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [rowSelection, setRowSelection] = useState(customConfig);
  const onChange = useCallback(keys => setSelectedRowKeys(keys), []);
  useDeepCompareEffect(() => {
    const baseSelection = {
      selectedRowKeys,
      onChange,
      preserveSelectedRowKeys: true,
      selections: false,
    };
    if (!customConfig) {
      setRowSelection({});
    } else if (customConfig === true) {
      setRowSelection(baseSelection);
    } else {
      setRowSelection({
        ...baseSelection,
        ...customConfig,
      });
    }
  }, [selectedRowKeys, customConfig]);
  return rowSelection;
};

