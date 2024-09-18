

// import React from 'react';
// import Image from 'next/image';
// import { BiDotsHorizontalRounded } from "react-icons/bi";
// import { AiFillLock } from "react-icons/ai";  // For the lock icon
// import { useCurrentUser } from '@/hooks/user';

// const SidebarUserProfile = () => {
//   const { user } = useCurrentUser();

//   if (!user) {
//     return null; // Don't render anything if the user is not logged in
//   }

//   return (
//     <div className="absolute bottom-5 left-0 w-full">  {/* Positioned on the left */}
//       <div className="flex gap-2 items-center bg-gray-100 p-2 rounded-full shadow-sm cursor-pointer hover:bg-gray-200 transition-colors duration-200 max-w-xs mx-auto">
//         {user.profileImageURL && (
//           <Image 
//             className="rounded-full" 
//             src={user.profileImageURL} 
//             alt="user-image" 
//             height={40} 
//             width={40} 
//           />
//         )}
//         <div className="flex-grow">
//           <div className="flex items-center">
//             <h3 className="text-sm font-semibold text-gray-900">{user.firstName}</h3>
//             <AiFillLock className="ml-1 text-gray-500" />  {/* Lock icon */}
//           </div>
//           <p className="text-xs text-gray-500">@{user.username}</p>
//         </div>
//         <BiDotsHorizontalRounded className="text-lg text-gray-500" />
//       </div>
//     </div>
//   );
// };

// export default SidebarUserProfile;

