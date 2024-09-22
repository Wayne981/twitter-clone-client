import { getAllTweetsQuery } from "@/graphql/query/tweet";
import { createTweetMutation } from "@/graphql/mutation/tweet";
import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import { graphQLClient } from "@/clients/api";
import toast from 'react-hot-toast';
import { CreateTweetData } from "@/gql/graphql";



  export const useCreateTweet = () => {
    const queryClient = useQueryClient();
  
    const mutation = useMutation({
      mutationFn: (payload: CreateTweetData) => 
        graphQLClient.request(createTweetMutation, { payload }), // Fixed payload formatting
  // onMutate: (payload) => toast.loading('Creating Tweet' , {id: 1}), 
  onSuccess: async (data) => {
    await queryClient.invalidateQueries("all-tweets");
    toast.success('Tweet Created Successfully', { id: "1" });
  },
    });
  
    return mutation;
  };
  

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
