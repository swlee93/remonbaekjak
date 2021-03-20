import styled from 'styled-components'
import { Layout } from 'antd'

const { Sider, Header, Content } = Layout

export const StyledLayout = styled(Layout)`
  height: 100%;
`
export const StyledHeader = styled(Header)`
  padding: 0 16px;
  background-color: #141414;
  border-bottom: solid 1px #303030;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const StyledSider = styled(Sider)`
  background-color: #141414;
  border-right: solid 1px #303030;
  & ${StyledHeader} {
    background-color: inherit;
    border-bottom: unset;
  }
`

export const StyledContentInner = styled(Content)`
  display: flex;
  flex-flow: column;
  height: 100%;
`
export const StyledContent = styled(Content)`
  display: flex;
  flex-flow: column;
  height: 100%;
  & ${StyledContentInner} {
    overflow: auto;
  }
`
