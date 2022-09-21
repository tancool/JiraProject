
import { Table, TableProps, Dropdown, Menu, Modal } from 'antd';
import { ButtonNoPadding } from 'components/lib';
import { Pin } from 'components/pin';
import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDeleteProject, useEditProject } from 'utils/project';
import { User } from './searchPanel';
import { useProjectModal, useProjectQueryKey } from './util';

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number
}

// 这里是一种透传的方式
interface ListProps extends TableProps<Project> {
  users: User[],
}

const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject(useProjectQueryKey());
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
  return (<Table pagination={false} columns={[
    {
      title: <Pin checked={true} disabled={true} />,
      render(value, project) {
        return <Pin
          checked={project.pin}
          onCheckedChange={pinProject(project.id)}
        />
      }
    },
    {
      title: '名称',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render(_, project) {
        return <Link to={String(project.id)}>{project.name}</Link>;
      }
    },
    {
      title: '部门',
      key: 'organization',
      dataIndex: 'organization',
    },
    {
      title: '负责人',
      key:'name',
      render(_, project) {
        return <span key={project.id}>
          {users.find(user => user.id === Number(project.personId))?.name || '未知'}
        </span>
      }
    },
    {
      title: '创建时间',
      key: 'createdAt',
      render(_, project) {
        return <span>
          {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
        </span>
      }
    },
    {
      render(value, project) {
        return <More project={project} />
      }
    }
  ]}
    // 这里的props是一种透传的方式
    {...props}
    rowKey={'id'}
  >

  </Table >)


  // 下面是JS的原生代码
  // return (
  //   <div>
  //     <table>
  //       <thead>
  //         <tr>
  //           <th>名称</th>
  //           <th>负责人</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {
  //           list.map((project: any) => (
  //             <tr key={project.id}>
  //               <td>{project.name}</td>
  //               <td>{users.find((user) => user.id === project.id)?.name || '未知'}</td>
  //             </tr>
  //           ))
  //         }
  //       </tbody>
  //     </table>
  //   </div>
  // )
}
const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);
  const { mutate: deleteProject } = useDeleteProject(useProjectQueryKey());
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: '确定删除这个项目吗',
      content: '点击确定删除',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        deleteProject({id});
      }
    })
  }
  return <Dropdown overlay={
    <Menu
      items={[
        {
          key: 'edit',
          label: <ButtonNoPadding type={'link'} >编辑</ButtonNoPadding>,
          onClick: editProject(project.id)
        },
        {
          key: 'delete',
          label: <ButtonNoPadding type={'link'} onClick={() => confirmDeleteProject(project.id)}>删除</ButtonNoPadding>,
          onClick: () => { }
        }
      ]}>
    </Menu >
  }>
    <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
  </Dropdown >
}

export default List;