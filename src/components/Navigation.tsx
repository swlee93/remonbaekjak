import React, { useContext, useState } from 'react'
import { Layout, Menu } from 'antd'
import { getMenu, MenuItemInterface } from 'constants/menu'
import { MenuContext, MenuHandlerContext } from 'contexts'

const MenuItem = Menu.Item

const Navigation = () => {
  const { menu, defaultMenu } = useContext(MenuContext)
  const { onSelectMenu } = useContext(MenuHandlerContext)

  if (!menu || !defaultMenu || !onSelectMenu) return <></>
  return (
    <Menu mode='inline' defaultSelectedKeys={[defaultMenu?.uri]} onSelect={onSelectMenu}>
      {menu.map(({ name, uri }: MenuItemInterface) => (
        <MenuItem key={uri}>{name}</MenuItem>
      ))}
    </Menu>
  )
}

export default Navigation
