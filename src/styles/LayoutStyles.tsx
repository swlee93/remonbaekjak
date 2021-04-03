import React from 'react'
import styled, { CSSProperties, Interpolation, ThemedStyledProps } from 'styled-components'
import { Layout, Typography } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
const { Text } = Typography
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
  ${({ gap }) => gap && `padding: ${gap}; gap: ${gap};`};
  flex-flow: column;
  height: 100%;
  & ${StyledContentInner} {
    overflow: auto;
  }
`

export const InfiniteScrollListWrapper = styled.div<{ hasNextPage?: boolean }>`
  height: 300px;
  overflow: auto;
  width: 100%;
  border-bottom: ${({ hasNextPage }) => (hasNextPage ? `unset` : 'solid 1px')};
`
export const InfiniteScrollLoadingWrapper = styled.div`
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
`
interface InfiniteScrollWrapperProps {
  hasNextPage?: boolean
  children: React.ReactNode
  total?: number
  count?: number
  error?: string
  loading?: boolean
}

export const InfiniteScrollWrapper = ({
  children,
  hasNextPage,
  count,
  total,
  error,
  loading,
}: InfiniteScrollWrapperProps) => {
  const showLabel = !!total && !!count
  return (
    <div style={{ width: '100%' }}>
      <InfiniteScrollListWrapper hasNextPage={hasNextPage}>{children}</InfiniteScrollListWrapper>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', alignItems: 'center' }}>
        {!!error && <Text type='danger'>{error}</Text>}
        {!!loading && <LoadingOutlined />}
        {showLabel && (
          <>
            <Text type='secondary'>{count}</Text>
            <Text type='secondary'>/</Text>
            <Text type='secondary'>{total}</Text>
          </>
        )}
      </div>
    </div>
  )
}
