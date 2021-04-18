export interface MenuItemInterface {
  uri: string
  name: string
  component: typeof import('components') | string
}

const MENU: MenuItemInterface[] = [
  { uri: '/task', name: 'Tasks', component: 'Task' },
  { uri: '/metrics', name: 'Metrics', component: 'Metrics' },
  { uri: '/reports', name: 'Reports', component: 'Reports' },
  // { uri: '/comments', name: 'Comments', component: 'Comments' },
  { uri: '/settings', name: 'Settings', component: 'Settings' },
  { uri: '/login', name: 'Log In', component: 'Login' },
  { uri: '/signup', name: 'Sign Up', component: 'SignUp' },
]
export const getMenu = (): MenuItemInterface[] => MENU
