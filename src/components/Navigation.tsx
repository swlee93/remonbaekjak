import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import { getMenu, MenuItemInterface } from 'constants/menu'
const MenuItem = Menu.Item

const Navigation = () => {
  const [menu] = useState(getMenu())
  const [defaultSelectedKeys] = useState([menu[0]?.uri])
  return (
    <Menu mode='inline' defaultSelectedKeys={defaultSelectedKeys}>
      {menu.map(({ name, uri }: MenuItemInterface) => (
        <MenuItem key={uri}>{name}</MenuItem>
      ))}
    </Menu>
  )
}

export default Navigation
