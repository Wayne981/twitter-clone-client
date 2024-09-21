// import React from 'react';
// import Image from "next/image";
// import { BiMessageRounded } from "react-icons/bi";
// import { FaRetweet } from "react-icons/fa";
// import { AiOutlineHeart } from "react-icons/ai";
// import {Tweet} from "@/gql/graphql"; 

// interface FeedCardProps {
//   data : Tweet 
// }

// const FeedCard: React.FC<FeedCardProps> = (props) => {
//   const {data} = props 

//   console.log("FeedCard data:", data);
//   return (
//     <div className="border-b-[1px] border-gray-400 transition-all cursor-pointer p-4">
//       <div className="flex items-start gap-4">
//       {data.author?.profileImageURL && <Image
//           src={data.author.profileImageURL}
//           alt="user-image"
//           height={50}
//           width={50}
//           className="rounded-full"
//         />} 
//         <div className="flex-1">
//         <p className="font-bold">{data.author?.firstName} {data.author?.lastName}</p>
// <p className="text-gray-500">@{data.author?.firstName}{data.author?.lastName}</p>
// <p className="mt-2">
//   {data.content}
// </p>
          
//           <div className="flex justify-between mt-4 text-gray-500">
//             <div className="flex items-center gap-1">
//               <BiMessageRounded className="w-5 h-5" />
//               <span>0</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <FaRetweet className="w-5 h-5" />
//               <span>0</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <AiOutlineHeart className="w-5 h-5" />
//               <span>0</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const FeedCard: React.FC<FeedCardProps> = ({ data }) => {
//   console.log("FeedCard rendering with data:", data);
//   return (
//     <div className="border p-4 mb-4">
//       <p>Content: {data.content}</p>
//       <p>Author: {data.author?.firstName} {data.author?.lastName}</p>
//     </div>
//   );
// };

// export default FeedCard;

    {/* I'm forever the 21-year-old 5-year-old. I'm forever the 5-year-old of something. */}


    import React from 'react';
import Image from "next/image";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { Tweet } from "@/gql/graphql";

interface FeedCardProps {
  data: Tweet
}

const FeedCard: React.FC<FeedCardProps> = ({ data }) => {
  console.log("FeedCard rendering with data:", data);
  return (
    <div className="border border-gray-600 border-r-0 border-l-0 border-b-0 p-5 hover:bg-slate-900 transition-all cursor-pointer">
      <div className="flex space-x-3">
        <div>
          <Image
            src={data.author?.profileImageURL || "/default-avatar.png"}
            alt="User Avatar"
            height={50}
            width={50}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <div className="font-bold">
            {data.author?.firstName} {data.author?.lastName}
          </div>
          <div className="text-gray-500">
            @{data.author?.firstName?.toLowerCase()}_{data.author?.lastName?.toLowerCase()}
          </div>
          <div className="mt-2">{data.content}</div>
          {data.imageURL && (
            <Image src={data.imageURL} alt="Tweet Image" height={300} width={400} className="rounded-xl mt-3" />
          )}
          <div className="flex justify-between mt-5 text-xl items-center p-2 w-[90%]">
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <FaRetweet />
            </div>
            <div>
              <AiOutlineHeart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;