import { BrowserRouter } from 'react-router-dom'
import Header from './Header'
import LayoutBuilder from './LayoutBuilder'
import Navigation from './Navigation'
import Routes from './Routes'
import { ApolloProvider, MenuProvider, UserProvider } from 'contexts'

const App = () => (
  <ApolloProvider>
    <BrowserRouter>
      <MenuProvider>
        <UserProvider>
          <LayoutBuilder Header={<Header />} Sider={<Navigation />} Content={<Routes />} />
        </UserProvider>
      </MenuProvider>
    </BrowserRouter>
  </ApolloProvider>
)

export default App
