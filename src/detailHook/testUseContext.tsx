import React, { useState } from 'react'

import TestUseContextSon from './testUseContextSon';

export const UserContext = React.createContext({});
const TestUseContext = () => {
  const [state, setState] = useState(1);
  return (
    <div>
      <div>
        {state}
      </div>
      <div>
        <UserContext.Provider value={{ state, setState }}>
          <TestUseContextSon />
        </UserContext.Provider>
      </div>
    </div >
  )
}
export default TestUseContext;


/*
import TestUseContextSon from './testUseContextSon';

const TestUseContext = () => {
  const [state, setState] = useState(1);
  const UserContext = React.createContext({ state, setState });
  return (
    <div>
      <div>
        {state}
      </div>
      <div>
        <TestUseContextSon context={UserContext} />
      </div>
    </div >
  )
}
export default TestUseContext;
*/