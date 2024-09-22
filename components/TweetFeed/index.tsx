import React from 'react';
import { useGetAllTweets } from '@/hooks/tweet';
import FeedCard from '@/components/FeedCard';
import { Tweet } from '@/gql/graphql';

const TweetFeed: React.FC = () => {
  const { data: tweets, isLoading, error } = useGetAllTweets();

  console.log('TweetFeed - tweets:', tweets);
  console.log('TweetFeed - isLoading:', isLoading);
  console.log('TweetFeed - error:', error);

  if (isLoading) return <div>Loading tweets...</div>;
  if (error) return <div>Error loading tweets: {error.message}</div>;
  if (!tweets || tweets.length === 0) return <div>No tweets found.</div>;

  return (
    <div>
      {tweets.map((tweet) => (
        <FeedCard key={tweet.id} data={tweet} />
      ))}
    </div>
  );
};

export default TweetFeed;