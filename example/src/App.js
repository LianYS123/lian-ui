import React from 'react';
import * as Demos from './demos';
import { Tabs } from 'antd';

import 'antd/dist/antd.css';
import 'lian-ui/dist/index.css';

const { TabPane } = Tabs;

const App = () => {
  return (
    <div style={{ margin: 20 }}>
      <Tabs>
        {Object.entries(Demos).map(([name, DemoComp]) => {
          return (
            <TabPane tab={name} key={name}>
              <DemoComp />
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};
export default App;