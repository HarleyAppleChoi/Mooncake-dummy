 // import { gql } from './node_modules/@apollo/client'; // import { ApolloClient, InMemoryCache } from './node_modules/@apollo/client';
// const client = new ApolloClient({ //   uri: 'https://gql.morpheus.desmos.network/', //   cache: new InMemoryCache() // }); // // const client = ...
// client //   .query({ //     query: gql` //           query MyQuery { //       block(limit: 1) { //         height //       } //     }
//     ` //   }) //   .then(result => console.log(result));
/*  fetch('https://m1k.gql.morpheus.desmos.network/v1/graphql', { 
    method: 'POST',   
    headers: { 'Content-Type': 'application/json' },   
    body: JSON.stringify({ 
      query: `{ block(limit: 1) 
        { height } }` }), 
    })   .then(res => res.json())
    .then(res => console.log(res.data));
 */

const _userContents = `
address
dtag
moniker
cover_pic
profile_pic
bio
`
 const _postContents = `
  id
  parent_id
  subspace
  created
  hidden
  last_edited
  allows_comments
  message
  optional_data
  media: medias {
    uri
    mime_type
  }
  poll {
    question
    end_date
    allows_answer_edits
    allows_multiple_answers
    available_answers {
      id: answer_id
      text: answer_text
    }
    user_answers {
      answer
      user {
        address
dtag
moniker
cover_pic
profile_pic
bio
      }
    }
  }
  reactions {
    user: owner {
      address
dtag
moniker
cover_pic
profile_pic
bio
    }
    value
  }
  user: creator {
    address
dtag
moniker
cover_pic
profile_pic
bio
  }
  comments: comments {
    id
  }
  `;

  console.log(_postContents)

  //getPostDetails
  fetch('https://m1k.gql.morpheus.desmos.network/v1/graphql', { 
    method: 'POST',   
    headers: { 'Content-Type': 'application/json' },   
    body: JSON.stringify({ 
      query: `posts: post(
        where: {
          parent_id: {_is_null: true},
          subspace: {_eq: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"}
        }
        order_by: { created: desc },
        offset: 1,
        limit: 11,
      ) {
        `+_postContents+`
      }` }), 
    })   .then(res => res.json())
    .then(res => console.log(res.data));




  /// Represents the GQL query that should be used when wanting to subscribe
  /// to home events such as new post being added.
 /*  static const String homeEvents = '''
  post_aggregate(
    where: {
      parent_id: {_is_null: true},
      subspace: {_eq: "${Constants.SUBSPACE}"},
    }
  ) {
    aggregate {
      count(columns: id)
    }
  } */