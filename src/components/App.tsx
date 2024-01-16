import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { decrement, increment } from 'store/modules/counterModule';
import type { RootState } from 'store/modules';

import subPackageComponents from 'subpackage1/components';

const { SubComponent1 } = subPackageComponents;

const AppStyled = styled.i``;

const App = () => {
  const number = useSelector((s: RootState) => s.counter.number);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <SubComponent1 />
        <AppStyled className="wni wni-add" />
        <div>{number}</div>
        <button type="button" onClick={() => dispatch(increment())}>+1</button>
        <button onClick={() => dispatch(decrement())}>-1</button>
      </div>
    </div>
  );
};

export default App;
