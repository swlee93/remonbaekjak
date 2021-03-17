import React, { createContext, useEffect, useState } from 'react'
import { getMenu, MenuItemInterface } from 'constants/menu'
import { useHistory } from 'react-router-dom'

interface MenuContextProps {
  menu?: MenuItemInterface[]
  defaultMenu?: MenuItemInterface
  currentMenu?: MenuItemInterface
}
const MenuContext = createContext<MenuContextProps>({})

interface MenuHandlerProps {
  onSelectMenu?: any
}
const MenuHandlerContext = createContext<MenuHandlerProps>({})

interface MenuProviderInterface {
  children: JSX.Element
}
const MenuProvider = ({ children }: MenuProviderInterface) => {
  const [menu] = useState(getMenu())
  const [defaultMenu] = useState(menu[0])
  const [currentMenu, setCurrentMenu] = useState<MenuItemInterface>(defaultMenu)
  const history = useHistory()
  const onSelectMenu = ({ key }: any) => {
    const selectedMenu = menu?.find(({ uri }) => key === uri)
    if (selectedMenu) {
      setCurrentMenu(selectedMenu)
    }
  }

  useEffect(() => {
    history.push(currentMenu?.uri)
  }, [currentMenu?.uri])

  return (
    <MenuContext.Provider value={{ menu, currentMenu, defaultMenu }}>
      <MenuHandlerContext.Provider value={{ onSelectMenu }}>{children}</MenuHandlerContext.Provider>
    </MenuContext.Provider>
  )
}

export { MenuContext, MenuHandlerContext }
export default MenuProvider
