import styled from "@emotion/styled";
import { Spin, Typography,Button } from "antd";
import { DevTools } from "jira-dev-tool";

// 可以重用的一些项目级别的组件
export const Row = styled.div<{
  gap?: number | boolean,
  between?: boolean,
  marginBottom?: number
}>`
display: flex;
align-items: center;
justify-content: ${props => props.between ? 'space-between' : undefined};
margin-bottom: ${props => props.marginBottom + 'rem'};
> *{
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'red' : props.gap ? '2rem' : undefined};

}
`

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const FullPageLoading = () => (
  <FullPage>
    <Spin size={'large'} />
  </FullPage>
)

export const FullPageErrorFallback = ({ error }: { error: Error }) => (
  <FullPage>
    <DevTools />
    <Typography.Text type={'danger'}>{error.message}</Typography.Text>
  </FullPage>
)


export const ButtonNoPadding = styled(Button)`
padding: 0;
`