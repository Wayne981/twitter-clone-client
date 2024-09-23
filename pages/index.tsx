import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { CredentialResponse } from '@react-oauth/google';
import toast from 'react-hot-toast';

import { graphQLClient } from '@/clients/api';
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from '@/hooks/user';
import { useGetAllTweets, useCreateTweet } from '@/hooks/tweet';
import { Tweet } from "@/gql/graphql";

import TwitterLayout from '@/components/Layout/TwitterLayout';

export default function Home() {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();
  const { tweets = [], isLoading, error } = useGetAllTweets();
  const [renderedTweets, setRenderedTweets] = useState<Tweet[]>([]);
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate } = useCreateTweet();

  useEffect(() => {
    console.log("Tweets updated:", tweets);
    setRenderedTweets(tweets);
  }, [tweets]);

  const handleSelectImage = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleCreateTweet = useCallback(() => {
    if (content.trim()) {
      mutate({ content });
      setContent('');
      setSelectedImage(null);
    }
  }, [content, mutate]);

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
    <TwitterLayout
      user={user}
      content={content}
      setContent={setContent}
      selectedImage={selectedImage}
      setSelectedImage={setSelectedImage}
      fileInputRef={fileInputRef}
      handleSelectImage={handleSelectImage}
      handleFileChange={handleFileChange}
      handleCreateTweet={handleCreateTweet}
      handleLoginWithGoogle={handleLoginWithGoogle}
      tweets={renderedTweets}
      isLoading={isLoading}
      error={error}
    />
  );
}