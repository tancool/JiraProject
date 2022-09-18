import React, { useEffect, useState } from 'react'
import SearchPanel from 'screens/projectList/searchPanel';
import List, { Project } from './list';
import { cleanObject, useDebounce, useDocumentTitle, useMount } from 'utils';
import { useHttp } from 'utils/http';
import styled from '@emotion/styled';
import { Typography, Button } from 'antd';
import { useAsync } from 'utils/useAsync';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';
import { useUrlQueryParam } from 'utils/url';
import { useProjectModal, useProjectsSearchParams } from './util';
import { ButtonNoPadding, Row } from 'components/lib';

const apiUrl = process.env.REACT_APP_API_URL;

const Index = (props: {}) => {
  // const [_, setParam] = useState({ // 课时 8-6
  //   name: '',
  //   personId: ''
  // });

  // const [keys, setKeys] = useState<('name' | 'personId')[]>(['name', 'personId']);

  const [params, setParam] = useProjectsSearchParams();
  // const [list, setList] = useState([]);
  // const [users, setUsers] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<null | Error>(null);

  // 只要 setParams每次一更新,页面都会被重新渲染. 该自定义Hook,也都会被执行.
  // 会在每次执行的时候,在Hook里去做一些判断.
  const debouncedParams = useDebounce(params, 200);
  // const client = useHttp();
  // const { run, isLoading, error, data: list } = useAsync<Project[]>();

  const { isLoading, error, data: list, retry } = useProjects(debouncedParams);

  const { data: users } = useUsers();
  useDocumentTitle('项目列表', false);
  const { projectModalOpen, open } = useProjectModal();
  // useEffect(() => {

  // fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParams))}`).then(async res => {
  //   if (res.ok) {
  //     setList(await res.json());
  //   }
  // });

  // setIsLoading(true);
  // client('projects', { data: cleanObject(debouncedParams) })
  //   .then(setList)
  //   .catch(error => {
  //     setList([]);
  //     setError(error);
  //   })
  //   .finally(() => setIsLoading(false));

  // 这个是最新的run 
  // run(client('projects', { data: cleanObject(debouncedParams) }));

  // 最新的
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [debouncedParams]);

  // useMount(() => {
  //   // fetch(`${apiUrl}/users`).then(async res => {
  //   //   if (res.ok) {
  //   //     setUsers(await res.json());
  //   //   }
  //   // })
  //   client('users').then(setUsers);
  // });
  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding type={'link'} style={{ 'padding': '0' }} onClick={open}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel
        params={params}
        setParam={setParam}
        users={users || []}
      />
      {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
      <List
        dataSource={list || []}
        users={users || []}
        loading={isLoading}
        refreach={retry}
      />
    </Container>
  )
}
const Container = styled.div`
  padding: 3.2rem;
`
export default Index;