import React, { useEffect, useState } from 'react'

const IsEffect = () => {
  const [num,setNum] = useState(0);
   /*
    * 如果这个在最上面,则是最先执行的
    * 如果不添加中括号,则每次渲染页面的时候都会去执行此UseEffect
   */
  //  useEffect(()=>{
  //   console.log('🚀🚀🚀🚀🚀');
  // });
  useEffect(() =>{
    console.log('这里执行到useEffect的一些操作');
    return ()=>console.log('==我这里的值发生了改变==');
  },[num]);
 
  // console.log('视图被更新了');
  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setNum(num=> num+ 1);
  //   }, 1000);
  //   return () => clearInterval(id);
  // }, []);

  return (
    <div>
      <p>isEffect</p>
      <p>{num}</p>
      <button onClick={()=>setNum(num=>num+1)}>点击加</button>
    </div>
  )
}

export default IsEffect;