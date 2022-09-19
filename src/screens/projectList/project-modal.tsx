import React, { useEffect } from 'react';
import { Drawer, Button, Spin, Form, Input } from 'antd';
import { useProjectModal } from './util';
import { UserSelect } from 'components/useSelect';
import { useAddProject, useEditProject } from 'utils/project';
import { useForm } from 'antd/lib/form/Form';
import { ErrorBox } from 'components/lib';
import styled from '@emotion/styled';

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } = useProjectModal();

  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject();

  const [form] = useForm();
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    })
  }

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  const title = editingProject ? '编辑项目' : '创建项目';

  return <Drawer forceRender={true} visible={projectModalOpen} width={'100%'} onClose={close}>
    <Container>
      {isLoading ? <Spin size={'large'} /> : <>
        <h1>{title}</h1>
        <ErrorBox error={error} />
        <Form layout={'vertical'} style={{ width: '40rem' }} onFinish={onFinish} form={form}>

          <Form.Item label={'名称'} name={'name'} rules={[{ required: true, message: '请输入项目名' }]}>
            <Input placeholder={'请输入项目名称'} />
          </Form.Item>

          <Form.Item label={'部门'} name={'organization'} rules={[{ required: true, message: '请输入部门名称' }]}>
            <Input placeholder={'请输入部门名称'} />
          </Form.Item>

          <Form.Item label={'负责人'} name={'personId'}>
            <UserSelect defaultOptionName={'负责人'} />
          </Form.Item>

          <Form.Item style={{ textAlign: 'right' }}>
            <Button loading={mutateLoading} type={'primary'} htmlType={'submit'}>
              提交
            </Button>
          </Form.Item>

        </Form>
      </>}
    </Container>
  </Drawer>
}

const Container = styled.div`
height: 80vh;
flex-direction: column;
display: flex;
justify-content: center;
align-items: center;
`;