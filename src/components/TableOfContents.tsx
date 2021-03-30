import React from 'react'
import { Anchor, Layout } from 'antd'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

const ANCHOR_ID = 'ANCHOR_ID'
const TableOfContentsItemWrap = styled.div<{ hasLinkId: boolean }>`
  ${(props) => props.hasLinkId && `cursor: pointer;`}
  opacity: 0.3;
`
const TableOfContentsWrap = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  display: grid;
  gap: 8px;
  overflow: auto;
  padding: 16px 24px;
  z-index: -1;
  &:hover {
    z-index: 1;
    & ${TableOfContentsItemWrap}:not(:hover) {
      opacity: 0.8;
    }
  }
  & ${TableOfContentsItemWrap}:hover {
    opacity: 1;
    font-weight: bold;
  }
`

const TableOfContents = () => {
  return <TableOfContentsWrap id={ANCHOR_ID}></TableOfContentsWrap>
}

interface TableOfContentsItemProps {
  title: string
  linkId?: string
  scrollFromId?: string
}

const TableOfContentsItem = ({ title, linkId, scrollFromId }: TableOfContentsItemProps) => {
  const container = document.getElementById(ANCHOR_ID)
  const onClickItem = () => {
    if (linkId) {
      const target = document.getElementById(linkId)
      const scrollFrom = scrollFromId ? document.getElementById(scrollFromId) : container?.parentElement
      if (target?.offsetTop && scrollFrom) {
        scrollFrom.scrollTo({ behavior: 'smooth', top: target?.offsetTop - 50 })
      }
    }
  }
  // return <></>
  if (container) {
    return createPortal(
      <TableOfContentsItemWrap hasLinkId={!!linkId} onClick={onClickItem} key={title}>
        {title}
      </TableOfContentsItemWrap>,
      container,
    )
  } else {
    return <></>
  }
}

export { TableOfContents as default, TableOfContentsItem }
