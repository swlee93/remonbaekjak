import React, { useEffect, useState } from 'react'
import { Anchor, Layout } from 'antd'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

const ANCHOR_ID = 'ANCHOR_ID'
const TableOfContentsItemWrap = styled.div<{ hasLinkId: boolean; depth?: number }>`
  ${(props) => props.hasLinkId && `cursor: pointer;`}
  ${(props) => props.depth && `padding-left: ${props.depth * 20}px;`}
  opacity: 0.3;
`
const TableOfContentsWrap = styled.div<{ fixed: boolean }>`
  ${({ fixed }) => (fixed ? ` position: fixed; left: 0;top: 0;height: 100vh; z-index: -1;` : ``)}

  display: grid;
  gap: 8px;
  overflow: auto;
  padding: 16px 24px;

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
interface TableOfContentsProps {
  fixed?: boolean
}
const TableOfContents = ({ fixed = true }: TableOfContentsProps) => {
  return <TableOfContentsWrap fixed={fixed} id={ANCHOR_ID}></TableOfContentsWrap>
}

interface TableOfContentsItemProps {
  title?: string | undefined
  linkId?: string | undefined
  scrollFromId?: string
  depth?: number
}

const TableOfContentsItem = ({ title = '', linkId = '', scrollFromId, depth }: TableOfContentsItemProps) => {
  const [container, setContainer] = useState<HTMLElement | null>(null)
  useEffect(() => {
    setContainer(document.getElementById(ANCHOR_ID))
  }, [])
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
      <TableOfContentsItemWrap hasLinkId={!!linkId} depth={depth} onClick={onClickItem} key={title}>
        {title}
      </TableOfContentsItemWrap>,
      container,
    )
  } else {
    return <></>
  }
}

export { TableOfContents as default, TableOfContentsItem }
