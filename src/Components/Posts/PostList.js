import React from 'react';
import PostCard from './PostCard';


function PostLists({ posts }) {
  return (
    <>
      {
        posts?.map(post => {
          const {
            id,
            user,
            content,
            created_at
          } = post

          const {
            user_name: userName,
            name: userFullName,
            avatar_url: avatarUrl
          } = user

          const postDate = new Date(created_at);
          const formattedDate = postDate.toLocaleDateString();
          const formattedTime = postDate.toLocaleTimeString();

          return (
            <PostCard
              userFullName={userFullName}
              username={userName}
              profileImage={avatarUrl}
              content={content}
              postDate={formattedDate}
              postTime={formattedTime}
            />
          )
        })
      }
    </>
  )
}

export default PostLists;
