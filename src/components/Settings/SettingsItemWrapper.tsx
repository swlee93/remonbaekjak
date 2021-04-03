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
        <Descriptions title={title} layout='vertical' extra={extra}>
          <>{children}</>
        </Descriptions>
      </StyledContent>
    </>
  )
}
interface TitleWithIndexProps {
  label: string
  depth?: number
}

const TitleWithIndex = ({ label, depth }: TitleWithIndexProps) => {
  return (
    <>
      {label} <TableOfContentsItem title={label} linkId={label} depth={depth} />
    </>
  )
}

const SettingsItemChild = (props: DescriptionsItemProps) => {
  return <DescriptionsItem {...props} />
}

export { SettingsItem, SettingsItemChild, TitleWithIndex }
