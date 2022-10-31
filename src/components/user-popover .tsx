import React from 'react';
import { List, Popover, Typography, Divider, Button } from 'antd';
import { useProjects } from 'utils/project';
import styled from '@emotion/styled';
import { ButtonNoPadding } from './lib';
import { useProjectModal } from 'screens/projectList/util';
import { useUsers } from 'utils/user';

export const UserPopover = () => {
  const { data: users, isLoading, refetch } = useUsers();

  const content = <ContentContainer>
    <Typography.Text type={'secondary'}>用户列表</Typography.Text>
    <List>
      {
        users?.map(user => <List.Item key={user.id}>
          <List.Item.Meta title={user.name} />
        </List.Item>)
      }
    </List>
    <Divider />
  </ContentContainer>
  return <Popover placement={'bottom'} content={content} onVisibleChange={() => refetch()}>
    <span>组员</span>
  </Popover>
}

const ContentContainer = styled.div`
  min-width: 30rem;
`