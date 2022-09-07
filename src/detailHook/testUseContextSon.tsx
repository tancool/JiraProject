import React, { useContext } from 'react'
import TestUseCOntextGrandSon from './testUseContextGrandSon';
import { UserContext } from './testUseContext';

const TestUseContextSon = (props: any) => {
  let { state, setState }: any = useContext(UserContext);
  return (
    <div>
      <div>
        <div>
          <p>{state}</p>
        </div>
        <div>
          <button onClick={()=>setState(++state)}>孩子</button>
        </div>
      </div>
      <div>
        <TestUseCOntextGrandSon/>
      </div>
    </div>
  )
}

export default TestUseContextSon;

/*
import TestUseCOntextGrandSon from './testUseContextGrandSon';

const TestUseContextSon = (props: any) => {
  let {state,setState} = useContext(props.context);
  
  return (
    <div>
      <div>
        <div>
          <p>{state}</p>
        </div>
        <div>
          <button onClick={()=>setState(++state)}>孩子</button>
        </div>
      </div>
      <div>
      <TestUseCOntextGrandSon context={props.context}/>
      </div>
    </div>
  )
}

export default TestUseContextSon;
*/