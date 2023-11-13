import React, { useState, useEffect } from 'react';
import ComposePost from './ComposePost';
import PostLists from './Posts/PostList';
import {supabase} from './lib/SupabasseClient'
import { useAuth } from "../Auth/AuthContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
    const { state } = useAuth();

    const [posts, setPosts] = useState([]);
    const [userId, setUserId] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');

    useEffect(() => {

        const getPsosts = () =>{
        supabase
            .from('posts')
            .select('*,user:users(name, avatar_url, user_name)')
            .order('created_at', { ascending: false }) 
            .limit(5)
            .then(({ data, error }) => {
                if (error) {
                    toast.error('Error fetching posts:', error);
                } else {
                    setPosts(data);
                    if (state.user && state.user.iduser) {
                        setUserId(state.user.iduser);
                        setAvatarUrl(state.user.avatar);
                    }
                    
                }
            });
        }
        const intervalId = setInterval(getPsosts, 2000);
        return () => {
            clearInterval(intervalId);
          };
    }, [state.user]);


    return (
        <div className="absolute inset-y-0 right-0 w-4/5 bg-gray-900 min-h-screen">
            <section className="max-w-[800px] border-l border-r border-white/20 min-h-screen rounded-md bg-gray-700">
                <ComposePost userAvatarUrl={avatarUrl}
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
