import React from 'react';
import PostCard from './PostCard';

function PostLists({ posts }) {
  return (
    <div className="h-[45rem] overflow-y-scroll p-4  rounded-md">
      {posts?.map(post => {
        const {
          id,
          User,
          content,
          created_at
        } = post;

        const {
          username: userName,
          name: userFullName,
          avatarurl: avatarUrl
        } = User;

        const postDate = new Date(created_at);
        const formattedDate = postDate.toLocaleDateString();
        const formattedTime = postDate.toLocaleTimeString();

        return (
          <PostCard
            key={id}
            userFullName={userFullName}
            username={userName}
            profileImage={avatarUrl}
            content={content}
            postDate={formattedDate}
            postTime={formattedTime}
            idPost={id}
          />
        );
      })}
    </div>
  );
}

export default PostLists;