export interface MenuItemInterface {
  uri: string
  name: string
  component: string
}
const MENU: MenuItemInterface[] = [{ uri: '/url', name: 'URLs', component: 'URL' }]
export const getMenu = (): MenuItemInterface[] => MENU
