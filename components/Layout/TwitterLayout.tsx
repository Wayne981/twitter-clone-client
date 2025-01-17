import React from "react";
import { BsTwitter, BsSearch, BsEmojiSmile } from "react-icons/bs";
import { BiHomeCircle, BiHash, BiBell, BiEnvelope, BiBookmark, BiListUl, BiUser, BiDotsHorizontalRounded, BiImageAlt } from "react-icons/bi";
import { AiOutlineGif } from "react-icons/ai";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import TweetFeed from "../TweetFeed";
import Image from "next/image";
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { Tweet } from "@/gql/graphql";
import toast from 'react-hot-toast';

const IconButton: React.FC<{ icon: React.ReactNode; onClick: () => void }> = ({ icon, onClick }) => (
  <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer" onClick={onClick}>
    {icon}
  </div>
);

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

const sidebarMenuItems: TwitterSidebarButton[] = [
  { title: "Home", icon: <BiHomeCircle /> },
  { title: "Explore", icon: <BiHash /> },
  { title: "Notifications", icon: <BiBell /> },
  { title: "Messages", icon: <BiEnvelope /> },
  { title: "Bookmarks", icon: <BiBookmark /> },
  { title: "Lists", icon: <BiListUl /> },
  { title: "Profile", icon: <BiUser /> },
  { title: "More", icon: <BiDotsHorizontalRounded /> }
];

interface TwitterLayoutProps {
  user: any;
  content: string;
  setContent: (content: string) => void;
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleSelectImage: () => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCreateTweet: () => void;
  handleLoginWithGoogle: (cred: CredentialResponse) => Promise<void>;
  tweets: Tweet[];
  isLoading: boolean;
  error: any;
}

const TwitterLayout: React.FC<TwitterLayoutProps> = ({
  user,
  content,
  setContent,
  selectedImage,
  setSelectedImage,
  fileInputRef,
  handleSelectImage,
  handleFileChange,
  handleCreateTweet,
  handleLoginWithGoogle,
  tweets,
  isLoading,
  error
}) => {
  return (
    <div className="flex min-h-screen max-w-7xl mx-auto">
      {/* Left Sidebar */}
      <header className="flex flex-col justify-between w-1/4 py-4 px-8">
        <div>
          <div className="text-3xl h-12 w-12 text-blue-400 hover:bg-blue-100 rounded-full p-2 cursor-pointer inline-flex items-center justify-center">
            <BsTwitter />
          </div>
          <nav className="mt-4">
            <ul>
              {sidebarMenuItems.map((item) => (
                <li key={item.title}>
                  <a href="#" className="flex items-center gap-4 text-xl py-3 px-3 hover:bg-gray-200 rounded-full">
                    <span className="text-2xl">{item.icon}</span>
                    <span>{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full w-full mt-4 text-lg">
            Tweet
          </button>
        </div>
        {user && (
          <div className="mb-4 flex items-center gap-2 cursor-pointer hover:bg-gray-200 rounded-full p-3">
            <Image src={user.profileImageURL} alt="Profile" width={40} height={40} className="rounded-full" />
            <div className="flex-grow">
              <p className="font-bold">{user.firstName} {user.lastName}</p>
              <p className="text-gray-500">@{user.firstName}7</p>
            </div>
            <BiDotsHorizontalRounded className="text-xl" />
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="w-1/2 border-x border-gray-200">
        <div className="sticky top-0 bg-white bg-opacity-80 backdrop-blur-sm z-10">
          <h1 className="text-xl font-bold p-4">Home</h1>
        </div>
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex gap-4">
            {user && <Image src={user.profileImageURL} alt="Profile" width={48} height={48}  className="w-14 h-14 rounded-full shadow-lg border-2 border-gray-30 object-cover"  />}
            <div className="flex-grow">
              <textarea 
                value={content} 
                onChange={e => setContent(e.target.value)}
                className="w-full text-xl placeholder-gray-600 focus:outline-none resize-none" 
                placeholder="What's happening?"
                rows={1}
              ></textarea>
              {selectedImage && (
                <div className="mt-2 relative">
                  <img src={selectedImage} alt="Selected" className="max rounded-lg" />
                  <button 
                    className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1"
                    onClick={() => setSelectedImage(null)}
                  >
                    X
                  </button>
                </div>
              )}

              
              <div className="flex justify-between items-center mt-3">
                <div className="flex gap-2 text-blue-400">
                  <IconButton icon={<BiImageAlt />} onClick={handleSelectImage} />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <IconButton icon={<AiOutlineGif />} onClick={() => {}} />
                  <IconButton icon={<BsEmojiSmile />} onClick={() => {}} />
                  <IconButton icon={<IoCalendarNumberOutline />} onClick={() => {}} />
                  <IconButton icon={<HiOutlineLocationMarker />} onClick={() => {}} />
                </div>
                <button 
                  onClick={handleCreateTweet} 
                  disabled={!content.trim()}
                  // disabled={!(content ?? '').trim()}
                  className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full disabled:opacity-50"
                >
                  Tweet
                </button>
              </div>
            </div>
          </div>
        </div>

        <TweetFeed tweets={tweets} isLoading={isLoading} error={error} />
      </main>

      {/* Right Sidebar */}
      <aside className="w-1/4 py-4 px-4">
        <div className="sticky top-4">
          <div className="relative mb-4">
            <input 
              type="text" 
              placeholder="Search Twitter" 
              className="bg-gray-100 rounded-full py-2 px-10 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white"
            />
            <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <div className="bg-gray-50 rounded-2xl overflow-hidden mb-4">
            <h2 className="font-bold text-xl px-4 py-3 border-b border-gray-200">What's happening</h2>
            {/* Trending topics would go here */}
          </div>
          <div className="bg-gray-50 rounded-2xl overflow-hidden">
            <h2 className="font-bold text-xl px-4 py-3 border-b border-gray-200">Who to follow</h2>
            {/* Who to follow suggestions would go here */}
          </div>
          {!user && (
            <div className="mt-4 p-5 bg-slate-700 rounded-lg">
              <h1 className="my-2 text-2xl text-white">New to Twitter?</h1>
              <GoogleLogin 
                onSuccess={handleLoginWithGoogle}
                onError={() => {
                  console.log('Login Failed');
                  toast.error('Login Failed');
                }}
              />
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

export default TwitterLayout;