import styled, { CSSProperties, Interpolation, ThemedStyledProps } from 'styled-components'
import { Layout } from 'antd'

const { Sider, Header, Content } = Layout

export const StyledLayout = styled(Layout)`
  height: 100%;
`

type Size = 'large' | 'small' | undefined

export const StyledHeader = styled(Header)<{ size?: Size }>`
  padding: 0 16px;
  background-color: #141414;
  border-bottom: solid 1px #303030;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ size }) => {
    console.log('size', size)
    switch (size) {
      case 'large':
        return `font-size: 16px; font-weight: 700;`
      case 'small':
        return `font-size: 12px; font-weight: 100;`
      default:
        return `font-size: 14px;`
    }
  }}
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
  flex: 100%;
  & ${StyledHeader}, & ${StyledSider} {
    background: unset;
    border: unset;
  }
`
export const StyledContent = styled(Content)<{ gap?: string }>`
  display: flex;
  flex-flow: column;
  height: 100%;
  & ${StyledContentInner} {
    overflow: auto;
  }

  ${({ gap }) => gap && `padding: ${gap}; gap: ${gap};`};
`
