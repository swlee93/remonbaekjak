import { HeaderPlace } from 'components/Header'
import TableOfContents, { TableOfContentsItem } from 'components/TableOfContents'
import React from 'react'
import { StyledContentInner, StyledSider } from 'styles/LayoutStyles'
import GithubPlugin from './GithubPlugin'
const Settings = () => {
  return (
    <>
      <HeaderPlace>
        <>Settings</>
      </HeaderPlace>
      {/* Plugins */}
      <GithubPlugin />
      <StyledSider>
        <TableOfContents fixed={false} />
      </StyledSider>
    </>
  )
}
export default Settings
