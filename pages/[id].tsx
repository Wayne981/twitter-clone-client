// import FeedCard from "@/components/FeedCard";
// // OM NAME Shivaya 
// import TwitterLayout from "@/components/Layout/TwitterLayout";
// import type { NextPage } from "next";
// import { useCurrentUser } from "@/hooks/user";
// import { BsArrowLeftShort } from "react-icons/bs";

// const UserProfilePage: NextPage = () => {
//   return (
//     <div>
//       <TwitterLayout>
// <h1> Profile Page</h1>

//         <div> 
//         <nav className="flex items-center gap-3 py-3 px-3">
//       <BsArrowLeftShort className="text-4xl" />
//       <div>
//         <h1 className="text-2xl font-bold">Illayaraja </h1>
//         <h1 className="text-md font-bold text-slate-500">100 Tweets</h1>
//       </div>
//     </nav>
//     <div className="p-4 border-b border-slate-800">
//       {user?.profileImageURL && (
//         <Image
//           src={user?.profileImageURL}
//           alt="user-image"
//           className="rounded-full"
//           width={100}
//           height={100}
//         />
//       )}
//       <h1 className="text-2xl font-bold mt-5">Piyush Garg</h1>
      
//     </div>
//     <div> 
//       {user?.tweets?.map(tweet => <FeedCard data={tweet as Tweet} key={tweet?.id})}
//     </div>
//   </div>
// </TwitterLayout>

//     </div>
//   );
// };

// export default UserProfilePage;


import React from "react";
import { NextPage } from "next";
import TwitterLayout from "@/components/Layout/TwitterLayout"; // Adjust the path as needed

const UserProfilePage: NextPage = () => {
  return (
    <div>
    <TwitterLayout>
      <h1>Profile Page</h1>
    </TwitterLayout>
    </div>
  );
};

export default UserProfilePage;
