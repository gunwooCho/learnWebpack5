import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { decrement, increment } from 'store/modules/counterModule';
import SubComponent from 'subPackage1/components/subComponent1';

// import code from './util/static/images/code.svg';

const AppStyled = styled.i``;

const App = () => {
  const number = useSelector((s: any) => s.counter.number);
  console.log(number);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <SubComponent />
        <AppStyled className="wni wni-add" />
        <div>{number}</div>
        <button onClick={() => dispatch(increment())}>+1</button>
        <button onClick={() => dispatch(decrement())}>-1</button>
      </div>
    </div>
  );
};

export default App;
