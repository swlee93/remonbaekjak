import React from 'react'
import { HeaderPlace } from 'components/Header'
import TableOfContents, { TableOfContentsProvider } from 'components/TableOfContents'
import { StyledContent, StyledSider } from 'styles/LayoutStyles'
import GithubPlugin from './GithubPlugin'
const Settings = () => {
  return (
    <TableOfContentsProvider containerId={'settings_container'} scrollFromId={'scroll_container'}>
      <HeaderPlace>
        <>Settings</>
      </HeaderPlace>
      {/* Plugins */}
      <StyledContent gap='20px' id='scroll_container'>
        <GithubPlugin />
      </StyledContent>
      <StyledSider>
        <TableOfContents />
      </StyledSider>
    </TableOfContentsProvider>
  )
}
export default Settings
