import gql from 'graphql-tag'

export default gql`
    query posts{
        posts{
            _id
            content
            image
            like{
                _id
                name
            }
            comment{
                _id
                content
                userId{
                    _id
                    name
                }
            }
            userId{
                email
                name
                _id
            }
        }
    }
    `