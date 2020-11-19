import { gql } from './node_modules/@apollo/client';
import { ApolloClient, InMemoryCache } from './node_modules/@apollo/client';

const client = new ApolloClient({
  uri: 'https://gql.morpheus.desmos.network/',
  cache: new InMemoryCache()
});
// const client = ...

client
  .query({
    query: gql`
          query MyQuery {
      block(limit: 1) {
        height
      }
    }

    `
  })
  .then(result => console.log(result));