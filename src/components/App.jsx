import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { decrement, increment } from 'store/modules/counterModule';
import { SubComponent1 } from 'subpackage1/components';

const AppStyled = styled.i``;

const App = () => {
  const number = useSelector(s => s.counter.number);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <SubComponent1 />
        <AppStyled className="wni wni-add" />
        <div>{number}</div>
        <button onClick={() => dispatch(increment())}>+1</button>
        <button onClick={() => dispatch(decrement())}>-1</button>
      </div>
    </div>
  );
};

export default App;
