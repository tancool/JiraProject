import React from 'react';

export const Mark = ({ name, keyword }: { name: string, keyword: string }) => {
  if (!keyword) {
    return <>{name}</>
  }
  const arr = name.split(keyword);
  return <>
    {
      arr.map((str: string, index: number) => <span key={index}>
        {str}
        {
          // 这个的意思是, 最后一个不添加隔断符(隔断夫也就是keyword)
          index === arr.length - 1 ? null : <span style={{ color: '#257AFD' }}>
            {keyword}
          </span>
        }
      </span>)
    }
  </>
}