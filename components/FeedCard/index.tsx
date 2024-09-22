{/* I'm forever the 21-year-old 5-year-old. I'm forever the 5-year-old of something. */}

import React, { useState } from 'react';
import Image from "next/image";
import { BiMessageRounded, BiHeart } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { Tweet } from "@/gql/graphql";

interface FeedCardProps {
  data: Tweet
}

const FeedCard: React.FC<FeedCardProps> = ({ data }) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => setIsLiked(!isLiked);

  return (
    <div className="border-b border-gray-200 p-4 bg-white">
      <div className="flex space-x-4">
        <div className="flex-shrink-0">
          <Image
            src={data.author?.profileImageURL || "/default-avatar.png"}
            alt="User Avatar"
            height={48}
            width={48}
            className="rounded-full"
          />
        </div>
        <div className="flex-grow">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-gray-900">
              {data.author?.firstName} {data.author?.lastName}
            </span>
            <span className="text-gray-500 text-sm">
              @{data.author?.firstName?.toLowerCase()}_{data.author?.lastName?.toLowerCase()}
            </span>
            <span className="text-gray-500 text-sm">·</span>
            <span className="text-gray-500 text-sm">
              {new Date(data.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
          <p className="mt-2 text-gray-800">{data.content}</p>
          {data.imageURL && (
            <div className="mt-3 rounded-2xl overflow-hidden border border-gray-200">
              <Image src={data.imageURL} alt="Tweet Image" height={300} width={500} className="w-full h-auto object-cover" />
            </div>
          )}
          <div className="flex justify-between mt-4 text-gray-500 max-w-md">
            <button className="flex items-center space-x-2">
              <BiMessageRounded className="text-xl text-gray-500" />
              <span className="text-sm">
                {/* {Math.floor(Math.random() * 100)} */}
              </span>
            </button>
            <button className="flex items-center space-x-2">
              <FaRetweet className="text-xl text-gray-500" />
              <span className="text-sm">
                {/* {Math.floor(Math.random() * 100)} */}
              </span>
            </button>
            <button className="flex items-center space-x-2" onClick={toggleLike}>
              <BiHeart 
                className={`text-xl ${isLiked ? 'text-red-500' : 'text-gray-500'}`} 
              />
              <span className={`text-sm ${isLiked ? 'text-red-500' : 'text-gray-500'}`}>
                {/* {Math.floor(Math.random() * 1000)} */}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;