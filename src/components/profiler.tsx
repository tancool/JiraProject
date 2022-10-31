import React from 'react';
import { ProfilerOnRenderCallback, ProfilerProps } from 'react';

type Props = { id: string; metadata?: any; phases?: ('mount' | 'update')[] } & Omit<ProfilerProps, 'onRender'>;

let queue: unknown[] = [];
const sendProfileQueue = () => {
  if (!queue.length) {
    return;
  }
  const queueToSend = [...queue];
  queue = [];
  console.log('查看数据');
  console.log(queueToSend);
}

// 模拟 间隔五秒提交到服务器一次
setInterval(sendProfileQueue, 1000);


export const Profiler = ({ metadata, phases, ...props }: Props) => {
  const reportProfile: ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions,) => {
    if (phases?.includes(phase)) {
      queue.push({
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions,
        metadata
      })
    }
  }
  // 其中props包含了children. 解构之后, 就直接渲染了.
  return <React.Profiler onRender={reportProfile} {...props} />
}