
import { Table, TableProps, Dropdown, Menu } from 'antd';
import { ButtonNoPadding } from 'components/lib';
import { Pin } from 'components/pin';
import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';
import { useEditProject } from 'utils/project';
import { User } from './searchPanel';
import { useProjectModal } from './util';

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
  const { startEdit } = useProjectModal();
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
  const editProject = (id: number) => () => startEdit(id);
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
      sorter: (a, b) => a.name.localeCompare(b.name),
      render(_, project) {
        return <Link to={String(project.id)}>{project.name}</Link>;
      }
    },
    {
      title: '部门',
      dataIndex: 'organization',
    },
    {
      title: '负责人',
      render(_, project) {
        return <span key={project.id}>
          {users.find(user => user.id === Number(project.personId))?.name || '未知'}
        </span>
      }
    },
    {
      title: '创建时间',
      render(_, project) {
        return <span>
          {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
        </span>
      }
    },
    {
      render(value, project) {
        return <Dropdown overlay={
          <Menu
            items={[
              {
                key: 'edit',
                label: <ButtonNoPadding type={'link'} >编辑</ButtonNoPadding>,
                onClick:editProject(project.id)
              },
              {
                key: 'delete',
                label: <ButtonNoPadding type={'link'} >删除</ButtonNoPadding>,
                onClick: () => { console.log('删除'); }
              }
            ]}>
          </Menu >
        }>
          <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
        </Dropdown >
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

export default List;