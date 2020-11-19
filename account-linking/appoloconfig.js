 // import { gql } from './node_modules/@apollo/client'; // import { ApolloClient, InMemoryCache } from './node_modules/@apollo/client';
// const client = new ApolloClient({ //   uri: 'https://gql.morpheus.desmos.network/', //   cache: new InMemoryCache() // }); // // const client = ...
// client //   .query({ //     query: gql` //           query MyQuery { //       block(limit: 1) { //         height //       } //     }
//     ` //   }) //   .then(result => console.log(result));
fetch('https://m1k.gql.morpheus.desmos.network/v1/graphql', { 
    method: 'POST',   
    headers: { 'Content-Type': 'application/json' },   
    body: JSON.stringify({ 
      query: '{ block(limit: 1) { height } }' }), 
    })   .then(res => res.json())
    .then(res => console.log(res.data));