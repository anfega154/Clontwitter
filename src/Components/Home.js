import React, { useState, useEffect } from 'react';
import ComposePost from './ComposePost';
import PostLists from './Posts/PostList';
import {supabase} from './lib/SupabasseClient'
import { AuthProvider, useAuth } from "../Auth/AuthContext";

function Home() {
    const { state, dispatch } = useAuth();

    const [posts, setPosts] = useState([]);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        supabase
            .from('posts')
            .select('*,user:users(name, avatar_url, user_name)')
            .order('created_at', { ascending: false }) 
            .limit(3)
            .then(({ data, error }) => {
                if (error) {
                    console.error('Error fetching posts:', error);
                } else {
                    setPosts(data);
                    if (state.user && state.user.iduser) {
                        setUserId(state.user.iduser);
                    }
                    
                }
            });
    }, []);
    

    return (
        <div className="absolute inset-y-0 right-0 w-4/5 bg-blue-200 min-h-screen">
            <section className="max-w-[800px] border-l border-r border-white/20 min-h-screen rounded-md bg-blue-300">
                <ComposePost userAvatarUrl={"https://elcomercio.pe/resizer/0zoHZLOjzUyr7f1tuip1OQgdCQ4=/580x330/smart/filters:format(jpeg):quality(90)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/LPW4JMM3MZG3DJA5RN5DGY44HU.jpeg"}
                 iduser={userId} />
             <PostLists posts={posts}/>
               {/* <pre>
        {
          JSON.stringify(posts, null, 2)
    
        }
      </pre> */}
            </section>
            

        </div>
    );
}

export default Home;
