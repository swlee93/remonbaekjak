export interface MenuItemInterface {
  uri: string
  name: string
  component: typeof import('components') | string
}

const MENU: MenuItemInterface[] = [{ uri: '/task', name: 'Tasks', component: 'Task' }]
export const getMenu = (): MenuItemInterface[] => MENU
