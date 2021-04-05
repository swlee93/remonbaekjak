export interface MenuItemInterface {
  uri: string
  name: string
  component: typeof import('components') | string
}

const MENU: MenuItemInterface[] = [
  { uri: '/task', name: 'Tasks', component: 'Task' },
  { uri: '/metrics', name: 'Metrics', component: 'Metrics' },
  { uri: '/comments', name: 'Comments', component: 'Comments' },
  { uri: '/settings', name: 'Settings', component: 'Settings' },
]
export const getMenu = (): MenuItemInterface[] => MENU
