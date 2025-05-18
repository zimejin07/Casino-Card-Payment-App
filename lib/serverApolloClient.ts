import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import fetch from 'cross-fetch'

const serverClient = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_HYGRAPH_URL,
    fetch,
    headers: {
      Authorization: `Bearer ${process.env.HYGRAPH_PAT}`,
    },
  }),
  cache: new InMemoryCache(),
})

export default serverClient
