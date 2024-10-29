import React, { useState, useEffect } from 'react';
import ComposePost from './ComposePost';
import PostLists from './Posts/PostList';
import {supabase} from './lib/SupabasseClient'
import { useAuth } from "../Auth/AuthContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Get } from './lib/Fetch';

function Home() {
    const { state } = useAuth();

    const [posts, setPosts] = useState([]);
    const [userId, setUserId] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');

       useEffect(() => {
        const getPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await Get('api/v1/tweets/feed?page=1&limit=10', token);
                const { body, success, error } = response;

                console.log(body);
    
                if (!success) {
                    toast.error('Error fetching posts:', error);
                } else {
                    setPosts(body);
                    if (state.user && state.user.iduser) {
                        setUserId(state.user.iduser);
                        setAvatarUrl(state.user.avatar);
                    }
                }
            } catch (error) {
                toast.error('Error fetching posts:', error.message);
            }
        };
    
        const intervalId = setInterval(getPosts, 2000);
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
            </section>
            

        </div>
    );
}

export default Home;
