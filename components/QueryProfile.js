import gql from 'graphql-tag'

export default gql`
query getUser {
    user {
      _id
      name
      email
      posts {
        _id
        content
        image
      }
    }
  }
`