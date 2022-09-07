import React from 'react';
import { useAuth } from 'context/auth-context';
import ProjectListScreen from './screens/projectList';
import styled from '@emotion/styled';
import { Row } from 'components/lib';
import { ReactComponent as SoftWareLogo } from 'assets/software-logo.svg';
import { Button, Dropdown, Menu } from 'antd';
import { Navigate, Route, Routes } from 'react-router';
import { ProjectScreen } from 'screens/project';
import { BrowserRouter as Router } from 'react-router-dom'
import { resetRute } from 'utils';
export const AuthenticatedApp = () => {
  return <div>
    <PageHeader />
    <Main>
      <Router>
        <Routes>
          <Route path={'/projects'} element={<ProjectListScreen />}></Route>
          <Route path={'/projects/:projectId/*'} element={<ProjectScreen />}></Route>
          <Route path='*' element={<Navigate to={'/projects'} />} />
        </Routes>
      </Router>
    </Main>
  </div>
}

const PageHeader = () => {
  const { logout, user } = useAuth();
  return <Header between={true}>
    <HeaderLeft gap={true}>
      <Button type={'link'} onClick={resetRute}>
        <SoftWareLogo width={'18rem'} color={'rgb(38,132,255)'} />
      </Button>
      <h2>项目</h2>
      <h2>用户</h2>
    </HeaderLeft>
    <HeaderRight>
      {/* 这里的TS可能是由于版本的错误,先不去管.*/}
      {/* @ts-ignore */}
      <Dropdown overlay={
        <Menu>
          <Menu.Item key={'logout'}>
            <Button type={'link'} onClick={logout}>登出</Button>
          </Menu.Item>
        </Menu>
      }
      >
        <Button type={'link'} onClick={e => e.preventDefault()}>
          Hi, {user?.name}
        </Button>
      </Dropdown>
    </HeaderRight>
  </Header>
}



const Container = styled.div`
  display: grid;
  grid-template-rows:6rem 1fr 6rem;
  /* 以下注释的CSS只是为了演示CSS属性的作用,在此项目里实际上没有用到 */
  /* grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas: 
  "header header header"
  "nav main aside"
  "footer footer footer"; */
  height: 100vh;
  /* grid-gap: 10rem; */
`

const Header = styled(Row)`
  padding:3.2rem;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
  z-index: 1;
`
const HeaderLeft = styled(Row)`
  display: flex;
  align-items: center;
`
const HeaderRight = styled.div`
`
const Main = styled.main`
  grid-area: main;
`
// const Nav = styled.nav`
//   grid-area: nav;
// `
// const Aside = styled.aside`
//   grid-area: aside;
// `
// const Footer = styled.footer`
//   grid-area: footer;
// `
