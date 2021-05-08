import React, { Fragment, ReactNode, useMemo } from 'react'
import { TableOfContentsItem } from 'components/TableOfContents'
import { StyledContent, StyledContentInner, StyledHeader } from 'styles/LayoutStyles'
import { Badge, Descriptions } from 'antd'
import styled from 'styled-components'
import { DescriptionsItemProps } from 'antd/lib/descriptions/Item'
const DescriptionsItem = Descriptions.Item
interface SettingsItemProps {
  title: ReactNode
  children: any
  extra?: any
}
const SettingsItem = ({ title, children, extra }: SettingsItemProps) => {
  return (
    <>
      <StyledContent>
        <Descriptions column={3} title={title} layout='vertical' extra={extra} colon={false}>
          <>{children}</>
        </Descriptions>
      </StyledContent>
    </>
  )
}
interface TitleWithIndexProps {
  label: string
  depth?: number
  actions?: ReactNode
}

const TitleWithIndex = ({ label, depth, actions = [] }: TitleWithIndexProps) => {
  return (
    <div id={label} style={{ display: 'flex', gap: '8px', flexFlow: 'column' }}>
      {label}
      {!!actions && <div style={{ display: 'flex', gap: '8px', flexFlow: 'column' }}>{actions}</div>}
      <TableOfContentsItem title={label} linkId={label} depth={depth} />
    </div>
  )
}

const SettingsItemChild = (props: DescriptionsItemProps) => {
  return <DescriptionsItem {...props} />
}

export { SettingsItem, SettingsItemChild, TitleWithIndex }
