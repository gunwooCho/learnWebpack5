import React from 'react';

import SubComponent3 from 'components/SubComponent3';

import { SubComponent1 } from './index';

const SubComponent2 = () => (
  <div>
    <SubComponent1 />
    subComponent2 hello world
    <SubComponent3 />
  </div>
);

export default SubComponent2;
