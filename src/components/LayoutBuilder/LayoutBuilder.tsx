import React, { useReducer } from 'react'
import LayoutButton from './LayoutButton'

import { StyledSider, StyledHeader, StyledContent, StyledLayout } from 'styles/LayoutStyles'

interface LayoutBuilderProps {
  Sider?: JSX.Element
  Header?: JSX.Element
  Content?: JSX.Element
}

const LayoutBuilder = ({ Sider, Header, Content }: LayoutBuilderProps) => {
  const [collapsed, toggleSider] = useReducer((toggle) => !toggle, false)

  return (
    <StyledLayout>
      {!!Sider && (
        <StyledSider collapsible breakpoint='lg' collapsedWidth='0' trigger={null} collapsed={collapsed}>
          {!collapsed && (
            <StyledHeader>
              <LayoutButton onClick={toggleSider} />
            </StyledHeader>
          )}
          {Sider}
        </StyledSider>
      )}
      {!!Header && <StyledHeader>{Header}</StyledHeader>}
      {!!Content && (
        <StyledContent>
          {!!Sider && collapsed && (
            <StyledHeader>
              <LayoutButton onClick={toggleSider} />
            </StyledHeader>
          )}
          {Content}
        </StyledContent>
      )}
    </StyledLayout>
  )
}

export default LayoutBuilder
