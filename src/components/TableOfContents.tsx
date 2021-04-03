import React, { createContext, useContext, useEffect, useState } from 'react'

import { createPortal } from 'react-dom'
import styled from 'styled-components'

let CONTAINER_ID_DEFAULT = 'table_of_contents'
const TableOfContentsItemWrap = styled.div<{ hasLinkId: boolean; depth?: number }>`
  ${(props) => props.hasLinkId && `cursor: pointer;`}
  ${(props) => props.depth && `padding-left: ${props.depth * 20}px;`}
  opacity: 0.3;
`
const TableOfContentsWrap = styled.div<{ fixedOnMask: boolean }>`
  position: fixed;

  ${({ fixedOnMask }) => (fixedOnMask ? `left: 0;top: 0;height: 100vh; z-index: -1;` : ``)}

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
  fixedOnMask?: boolean
}

const TableOfContentsContext = createContext<{ containerId: string; scrollFromId?: string }>({
  containerId: CONTAINER_ID_DEFAULT,
  scrollFromId: '',
})

const TableOfContentsProvider = ({
  children,
  containerId = CONTAINER_ID_DEFAULT,
  scrollFromId,
}: {
  children: React.ReactNode
  containerId?: string
  scrollFromId?: string
}) => {
  return (
    <TableOfContentsContext.Provider value={{ containerId, scrollFromId }}>{children}</TableOfContentsContext.Provider>
  )
}

const TableOfContents = ({ fixedOnMask = false }: TableOfContentsProps) => {
  const { containerId } = useContext(TableOfContentsContext)
  return <TableOfContentsWrap fixedOnMask={fixedOnMask} id={containerId}></TableOfContentsWrap>
}

interface TableOfContentsItemProps {
  title?: string | undefined
  linkId?: string | undefined
  scrollFromId?: string
  depth?: number
}

const TableOfContentsItem = ({ title = '', linkId = '', depth }: TableOfContentsItemProps) => {
  const [container, setContainer] = useState<HTMLElement | null>(null)
  const { containerId, scrollFromId } = useContext(TableOfContentsContext)
  useEffect(() => {
    const container = document.getElementById(containerId)
    if (container) {
      setContainer(document.getElementById(containerId))
    }
  }, [containerId])
  const onClickItem = () => {
    if (linkId) {
      const target = document.getElementById(linkId)
      const scrollFrom = scrollFromId ? document.getElementById(scrollFromId)?.parentElement : container?.parentElement
      if (target?.offsetTop && scrollFrom) {
        console.log('scrollFrom', scrollFrom?.offsetTop, target?.offsetTop)
        scrollFrom.scrollTo({ behavior: 'smooth', top: Math.abs(target?.offsetTop - scrollFrom?.offsetTop) })
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

export { TableOfContents as default, TableOfContentsItem, TableOfContentsProvider }
