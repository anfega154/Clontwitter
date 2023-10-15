import React from 'react';
import { FaHeart, FaComment, FaRetweet } from 'react-icons/fa';

const handleLikeClick = () => {
  // console.log(`Haz dado Me gusta a ${username}'s tweet: "${content}"`);
};

const handleCommentClick = () => {

  // console.log(`Has comentado en ${username}'s tweet: "${content}"`);
};

const handleRetweetClick = () => {

  // console.log(`Has retwitteado el tweet de ${username}: "${content}"`);
};

const PostCard = ({ userFullName,username, profileImage, content,postDate,postTime }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-4">
      <div className="flex items-center">
        <img src={profileImage} alt={`${username}'s profile`} className="w-12 h-12 rounded-full" />
        <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{userFullName}</h4>
            <h5 className="text-small tracking-tight text-default-400">@{username}</h5>
            <p className="text-gray-500 text-sm">{postDate} at {postTime}</p>
          </div>
      </div>
      <p className="mt-4">{content}</p>
      <div className="mt-4 flex items-center">
        <div className="mr-4 cursor-pointer" onClick={handleLikeClick}>
          <FaHeart className="text-red-500 text-2xl" />
        </div>
        <div className="mr-4 cursor-pointer" onClick={handleCommentClick}>
          <FaComment className="text-blue-500 text-2xl" />
        </div>
        <div className="cursor-pointer" onClick={handleRetweetClick}>
          <FaRetweet className="text-green-500 text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
