import React from 'react';
import PostCard from './PostCard';


 function PostLists () {
  return (
    <>
    {
        // posts?.map(post => {
        //   const {
        //     id,
        //     user,
        //     content
        //   } = post

        //   const {
        //     user_name: userName,
        //     name: userFullName,
        //     avatar_url: avatarUrl
        //   } = user

        //   return (
            <PostCard
            userFullName="Andres Gañan"
            username="UsuarioEjemplo"
            profileImage="https://elcomercio.pe/resizer/0zoHZLOjzUyr7f1tuip1OQgdCQ4=/580x330/smart/filters:format(jpeg):quality(90)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/LPW4JMM3MZG3DJA5RN5DGY44HU.jpeg"
            content="Este es un tweet de ejemplo. ¡Hola, mundo!"
            postDate="12/07/2023"
            postTime ="14:02"
          />
        //   )
        // })
      }
    </>
  )
}

export default PostLists;
