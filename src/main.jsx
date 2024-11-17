import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import './styles/index.css'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from '@apollo/client'

const root = ReactDOM.createRoot(document.getElementById('root'))

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000'
  })
})

root.render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
)

// `