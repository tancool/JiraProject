import React, { useContext } from 'react'

import { UserContext } from './testUseContext'

function TestUserContextGrandSon(props: any) {
  let { state, setState }: any = useContext(UserContext);
  return (
    <div>
      <div>
        <p>{state}</p></div>
      <div>
        <button onClick={() => setState(++state)}>孙子</button>
      </div>
    </div>
  )
}

export default TestUserContextGrandSon;

/*
function TestUserContextGrandSon(props: any) {
  let { state, setState }: any = useContext(props.context);
  return (
    <div>
      <div>
        <p>{state}</p></div>
      <div>
        <button onClick={() => setState(++state)}>孙子</button>
      </div>

      <div>

      </div>
    </div>
  )
}

export default TestUserContextGrandSon;
*/