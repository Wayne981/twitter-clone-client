import React from 'react';
import Image from "next/image";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";

const FeedCard = () => {
  return (
    <div className="border-b-[1px] border-gray-400 transition-all cursor-pointer p-4">
      <div className="flex items-start gap-4">
        <Image
          src="https://cdn.pixabay.com/photo/2024/01/15/11/36/batman-8510022_640.png"
          alt="user-image"
          height={50}
          width={50}
          className="rounded-full"
        />
        <div className="flex-1">
          <p className="font-bold">Chiranthan</p>
          <p className="text-gray-500">@Chiranthan7</p>
          <p className="mt-2">
            I'm forever the 21-year-old 5-year-old. I'm forever the 5-year-old of something.
          </p>
          <div className="flex justify-between mt-4 text-gray-500">
            <div className="flex items-center gap-1">
              <BiMessageRounded className="w-5 h-5" />
              <span>0</span>
            </div>
            <div className="flex items-center gap-1">
              <FaRetweet className="w-5 h-5" />
              <span>0</span>
            </div>
            <div className="flex items-center gap-1">
              <AiOutlineHeart className="w-5 h-5" />
              <span>0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;