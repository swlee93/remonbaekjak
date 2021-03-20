import React, { useContext, useReducer } from 'react'
import LayoutButton from './LayoutButton'

import { StyledSider, StyledHeader, StyledContent, StyledLayout, StyledContentInner } from 'styles/LayoutStyles'
import { MenuContext } from 'contexts'

interface LayoutBuilderProps {
  Sider?: JSX.Element
  Header?: JSX.Element
  Content?: JSX.Element
}

const LayoutBuilder = ({ Sider, Header, Content }: LayoutBuilderProps) => {
  const [collapsed, toggleSider] = useReducer((toggle) => !toggle, false)
  const { currentMenu } = useContext(MenuContext)
  return (
    <StyledLayout>
      {!!Sider && (
        <>
          <StyledSider collapsible breakpoint='lg' collapsedWidth='0' trigger={null} collapsed={collapsed}>
            <StyledHeader>
              <LayoutButton onClick={toggleSider} collapsed={collapsed} />
            </StyledHeader>
            {Sider}
          </StyledSider>
        </>
      )}
      <StyledContent>
        {!!Header && (
          <StyledHeader>
            <LayoutButton collapsed={collapsed} onClick={toggleSider} hidden={!Sider || !collapsed}>
              {currentMenu?.name}
            </LayoutButton>

            {Header}
          </StyledHeader>
        )}

        {!!Content && <StyledContentInner>{Content}</StyledContentInner>}
      </StyledContent>
    </StyledLayout>
  )
}

export default LayoutBuilder
