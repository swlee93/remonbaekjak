export interface MenuItemInterface {
  uri: string
  name: string
  component: keyof typeof import('components')
  sider?: false
}

const MENU: MenuItemInterface[] = [
  { uri: '/task', name: 'Tasks', component: 'Tasks' },
  { uri: '/metrics', name: 'Metrics', component: 'Metrics' },
  { uri: '/reports', name: 'Reports', component: 'Reports' },
  // { uri: '/comments', name: 'Comments', component: 'Comments' },
  { uri: '/settings', name: 'Settings', component: 'Settings' },
  { uri: '/login', name: 'Log In', component: 'Login', sider: false },
  { uri: '/signup', name: 'Sign Up', component: 'SignUp', sider: false },
]
export const getMenu = (): MenuItemInterface[] => MENU
