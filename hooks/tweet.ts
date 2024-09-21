import { getAllTweetsQuery } from "@/graphql/query/tweet";
import { createTweetMutation } from "@/graphql/mutation/tweet";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { graphQLClient } from "@/clients/api";
import toast from 'react-hot-toast';

// interface CreateTweetData {
//   content: string;
//   // Add other fields if necessary
// }


// export const useCreateTweet = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (tweetData: CreateTweetData) => {
//       console.log("Mutation function called with:", tweetData);
//       return graphQLClient.request(createTweetMutation, { payload: tweetData });
//     },
//     onSuccess: () => {
//       console.log("Tweet created successfully");
//       queryClient.invalidateQueries(["all-tweets"]);
//       toast.success("Tweet posted successfully");
//     },
//     onError: (error) => {
//       console.error("Error in useCreateTweet:", error);
//       toast.error("Failed to post tweet");
//     },
//   });
// };

export const useGetAllTweets = () => {
  return useQuery({
    queryKey: ["all-tweets"],
    queryFn: async () => {
      console.log(getAllTweetsQuery);
      console.log("Query before request:", getAllTweetsQuery);
const response = await graphQLClient.request(getAllTweetsQuery);

      
      console.log("Full GraphQL response:", response); // Log the full response
      return response.getAllTweets;
    },
    onError: (error) => {
      console.error("Error fetching tweets:", error);
    },
  });
};
