import React from 'react';
import { List, Popover, Typography, Divider, Button } from 'antd';
import { useProjects } from 'utils/project';
import styled from '@emotion/styled';
import { ButtonNoPadding } from './lib';
import { useProjectModal } from 'screens/projectList/util';

export const ProjectPopover = () => {
  const { data: projects, isLoading } = useProjects();
  const { projectModalOpen, open } = useProjectModal();
  const pinnedProjects = projects?.filter(project => project.pin);

  const content = <ContentContainer>
    <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
    <List>
      {
        pinnedProjects?.map(project => <List.Item key={project.id}>
          <List.Item.Meta title={project.name} />
        </List.Item>)
      }
    </List>
    <Divider />
    <ButtonNoPadding type={'link'} style={{ 'padding': '0' }} onClick={open}>
      创建项目
    </ButtonNoPadding>
  </ContentContainer>
  return <Popover placement={'bottom'} content={content}>
    <span>项目</span>
  </Popover>
}

const ContentContainer = styled.div`
  min-width: 30rem;
`