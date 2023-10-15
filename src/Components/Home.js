import React from 'react';
import ComposePost from './ComposePost';
import PostLists from './Posts/PostList';


function Home() {
    return (
        <div className="absolute inset-y-0 right-0 w-4/5 bg-blue-200">
            <section className="max-w-[800px] border-l border-r border-white/20 min-h-screen">
            <ComposePost userAvatarUrl={"https://elcomercio.pe/resizer/0zoHZLOjzUyr7f1tuip1OQgdCQ4=/580x330/smart/filters:format(jpeg):quality(90)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/LPW4JMM3MZG3DJA5RN5DGY44HU.jpeg"} />
             <PostLists/>
          
            </section>

        </div>
    );
}

export default Home;
