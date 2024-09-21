import { graphql } from "@/gql";

export const getAllTweetsQuery = graphql(`
    query GetAllTweets {
      getAllTweets {
        id
        content
        imageURL
        createdAt
        updatedAt
        author {
          id
          firstName
          lastName
          profileImageURL
        }
      }
    }
  `);



