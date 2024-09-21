import React, { useCallback , useState ,  useEffect, useRef} from 'react';
import { BsTwitter, BsSearch } from "react-icons/bs";
import { BiHomeCircle, BiHash, BiBell, BiEnvelope, BiBookmark, BiListUl, BiUser, BiDotsHorizontalRounded,  BiSmile , BiImageAlt } from "react-icons/bi";
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import FeedCard from "@/components/FeedCard";
import toast from 'react-hot-toast';
import { graphQLClient } from '@/clients/api';
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from '@/hooks/user';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { Tweet } from "@/gql/graphql";
import { AiOutlineGif } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useGetAllTweets } from "@/hooks/tweet";
import TweetFeed from '@/components/TweetFeed';

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

export default function Home() {
  const { tweets = [], isLoading, error } = useGetAllTweets();
  const [renderedTweets, setRenderedTweets] = useState<Tweet[]>([]);


  useEffect(() => {
    console.log("Tweets updated:", tweets);
    setRenderedTweets(tweets);
  }, [tweets]);

  const { user } = useCurrentUser();
  // const {tweets = []} = useGetAllTweets(); 

console.log("Tweets:", tweets);
console.log("Is loading:", isLoading);
// console.log("Is error:", isError);
console.log("Error:", error);
  const queryClient = useQueryClient();

  console.log(user);

    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
  
    const handleSelectImage = useCallback(() => {
      fileInputRef.current.click();
    }, []);
  
    const handleFileChange = useCallback((event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }, []);


  const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
    const googleToken = cred.credential;
    if (!googleToken) return toast.error(`Google token not found`);
    
    try {
      const { verifyGoogleToken } = await graphQLClient.request(verifyUserGoogleTokenQuery, { token: googleToken });
  
      if (verifyGoogleToken) {
        window.localStorage.setItem("_eno_ondh_esru", verifyGoogleToken);
      
        toast.success("Verified successfully");
        console.log(verifyGoogleToken);
      } else {
        throw new Error("Verification failed");
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      toast.error("Verification failed");
    }
    
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    }, 0);
  }, [queryClient]);


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

  {/* only want the logo of the user at the bottom , wrt to the user that is logged in  */}

{/* { user &&
        <div className="absolute bottom-5 flex gap-2 items-center bg-slate-800 p-3 rounded-xl">
  {user && user.profileImageURL && (
    <Image
      className="rounded-full"
      src={user?.profileImageURL}
      alt="user-image"
      height={50}
      width={50}
    />
  )}
  <div>
    <h3 className="text-xl">{user.firstName} {user.lastName}</h3>
  </div>
</div> 
} */}

{ user &&
        <div className="mb-4 flex items-center gap-2 cursor-pointer hover:bg-gray-200 rounded-full p-3">
          {/* <img src="https://pbs.twimg.com/profile_images/1537163390040150016/vQt9EE52_400x400.jpg" alt="Profile" className="w-10 h-10 rounded-full" /> */}
          <img src={user?.profileImageURL}  alt="Profile" className="w-10 h-10 rounded-full"/>
          <div className="flex-grow">
            <p className="font-bold">{user.firstName} {user.lastName}</p>
            <p className="text-gray-500">@{user.firstName}7</p>
          </div>
          <BiDotsHorizontalRounded className="text-xl" />
        </div>
      }



      </header>

      {/* Main Content */}
      <main className="w-1/2 border-x border-gray-200">
        <div className="sticky top-0 bg-white bg-opacity-80 backdrop-blur-sm z-10">
          <h1 className="text-xl font-bold p-4">Home</h1>
        </div>
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex gap-4">
            <img src="https://pbs.twimg.com/profile_images/1537163390040150016/vQt9EE52_400x400.jpg" alt="Profile" className="w-12 h-12 rounded-full" />
            <div className="flex-grow">
              <textarea 
                className="w-full text-xl placeholder-gray-600 focus:outline-none resize-none" 
                placeholder="What's happening?"
                rows={1}
              ></textarea>
              {selectedImage && (
                <div className="mt-2 relative">
                  <img src={selectedImage} alt="Selected" className="max-w-full h-auto rounded-lg" />
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
                  <IconButton icon={<AiOutlineGif />} />
                  <IconButton icon={<BsEmojiSmile />} />
                  <IconButton icon={<IoCalendarNumberOutline />} />
                  <IconButton icon={<HiOutlineLocationMarker />} />
                </div>
                <button className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>


        {/* <div>
  <p>Total tweets: {tweets?.length || 0}</p>
  {tweets && tweets.length > 0 ? (
    tweets.map((tweet) => {
      console.log("Rendering tweet:", tweet);
      return tweet ? (
        <FeedCard key={tweet.id} data={tweet as Tweet} />
      ) : (
        <p key={tweet.id}>Invalid tweet data</p>
      );
    })
  ) : (
    <p>No tweets available.</p>
  )}
</div> */}

<TweetFeed />

        {/* <div>
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div> */}
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
            {/* Trending topics */}
          </div>
          <div className="bg-gray-50 rounded-2xl overflow-hidden">
            <h2 className="font-bold text-xl px-4 py-3 border-b border-gray-200">Who to follow</h2>
            {/* Who to follow suggestions */}
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

const IconButton = ({ icon }) => (
  <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
    {icon}
  </div>
);