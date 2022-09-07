
/* @jsxImportSource @emotion/react */
import React from 'react';
import { Form, Input, Select } from 'antd';

export interface User {
  id: number;
  name: string;
  personId: string;
  organization: string;
  created: number;
  token: string;
}

interface SearchProps {
  users: User[];
  params: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchProps['params']) => void;
}
const SearchPanel = ({ params, setParam, users }: SearchProps) => {

  return (
    <Form layout={'inline'} css={{ marginBottom: '2rem', '>*': '' }}>

      <Form.Item>
        <Input type="text"
          placeholder={'请输入项目名'}
          onChange={e => setParam({
            ...params,
            name: e.target.value
          })} />
      </Form.Item>

      <Form.Item>
        <Select value={params.personId} onChange={value => {
          setParam({
            ...params,
            personId: value
          })
        }}>
          <Select.Option>负责人</Select.Option>
          {
            users.map((user) =>
            (<Select.Option value={String(user.id)} key={user.id}>
              {user.name}
            </Select.Option>)
            )
          }
        </Select>
      </Form.Item>

    </Form>
  )
}

export default SearchPanel;
