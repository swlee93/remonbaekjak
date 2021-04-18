import React, { createContext, useEffect, useState } from 'react'
import { getMenu, MenuItemInterface } from 'constants/menu'
import { useHistory } from 'react-router-dom'

interface MenuContextProps {
  menu?: MenuItemInterface[]
  defaultMenu?: MenuItemInterface
  currentMenu?: MenuItemInterface
  refresh: () => void
}
const MenuContext = createContext<MenuContextProps>({ refresh: () => window.open('/', '_self') })

interface MenuHandlerProps {
  onSelectMenu: ({ uri }: Partial<MenuItemInterface>) => void
}
const MenuHandlerContext = createContext<MenuHandlerProps>({ onSelectMenu: () => {} })

interface MenuProviderInterface {
  children: JSX.Element
}

class CurrentMenuStorage {
  storageName = 'current_menu'
  storage: any
  constructor() {
    try {
      const __storage = localStorage.getItem(this.storageName) || ''
      this.storage = JSON.parse(__storage)
    } catch (error) {
      this.storage = undefined
    }
  }
  get = () => {
    return this.storage
  }
  set = (menu: MenuItemInterface) => {
    localStorage.setItem(this.storageName, JSON.stringify(menu))
    this.storage = menu
  }
}

const MenuProvider = ({ children }: MenuProviderInterface) => {
  const [storage] = useState(new CurrentMenuStorage())
  const [menu] = useState(getMenu())
  const [defaultMenu] = useState(storage.get() || menu[0])
  const [currentMenu, setCurrentMenu] = useState<MenuItemInterface>(defaultMenu)
  const history = useHistory()

  const refresh = () => {
    // history.push(currentMenu?.uri)
    history.go(0)
  }

  const onSelectMenu = ({ uri }: Partial<MenuItemInterface>) => {
    const selectedMenu = menu?.find((m) => uri === m?.uri)
    console.log('selectedMenu', selectedMenu, menu, uri)
    if (selectedMenu) {
      setCurrentMenu(selectedMenu)
    }
  }

  useEffect(() => {
    history.push(currentMenu?.uri)
    storage.set(currentMenu)
  }, [currentMenu?.uri])

  return (
    <MenuContext.Provider value={{ menu, currentMenu, defaultMenu, refresh }}>
      <MenuHandlerContext.Provider value={{ onSelectMenu }}>{children}</MenuHandlerContext.Provider>
    </MenuContext.Provider>
  )
}

export { MenuContext, MenuHandlerContext }
export default MenuProvider
