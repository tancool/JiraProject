import React from 'react';
import { Drawer, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { projectListActions, selectProjectModalOpen } from './projectListSlice';

export const ProjectModal = () => {

  const dispatch = useDispatch();
  const projectModalOpen = useSelector(selectProjectModalOpen);
  console.log(projectModalOpen);

  return <Drawer
    visible={projectModalOpen}
    width={'100%'}
    onClose={() => dispatch(projectListActions.closeProjectModal())}
  >
    <h1>Project Modal</h1>
    <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>关闭</Button>
  </Drawer>
}