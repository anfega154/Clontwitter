import React from 'react';
import PostCard from './PostCard';


function PostLists({ posts }) {
  return (
    <>
      {
        posts?.map(post => {
          const {
            id,
            User,
            content,
            created_at
          } = post

          const {
            username: userName,
            name: userFullName,
            avatarurl: avatarUrl
          } = User

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
              idPost={id}
            />
          )
        })
      }
    </>
  )
}

export default PostLists;
