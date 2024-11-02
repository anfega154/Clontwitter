import logo from '../assets/img/logo.PNG';
import React, { useState, useEffect } from 'react';
import { Get } from './lib/Fetch';
import { toast } from 'react-toastify';

function Logo() {
  const token = localStorage.getItem('token');
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [users, setUsers] = useState([]);
  const [followingIds, setFollowingIds] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await Get('api/v1/user', token);
        const { body, success, error } = response;
        if (success) {
          setUsers(body);
        } else {
          toast.error(`Error fetching users: ${error}`);
        }
      } catch (error) {
        toast.error(`Error fetching users: ${error.message}`);
      }
    };

    const getFollowersAndFollowings = async () => {
      try {
        const response = await Get('api/v1/follwersandfollowings?page=1&limit=10', token);
        const { body, success, error } = response;
        if (success) {
          setFollowers(body.followers);
          setFollowing(body.followings);
          setFollowingIds(body.followings.map(f => f.followingid));
        } else {
          toast.error(`Error fetching followers: ${error}`);
        }
      } catch (error) {
        toast.error(`Error fetching followers: ${error.message}`);
      }
    };

    getUsers(); 
    getFollowersAndFollowings();
  }, [token]);

  const toggleFollow = (userId) => {
    if (followingIds.includes(userId)) {
      toast.success('lready following');
    } else {
      setFollowingIds([...followingIds, userId]);
      toast.success('Followed successfully');
    }
  };

  return (
    <div className="absolute inset-y-0 right-0 w-1/5 bg-gray-100 p-2">
      <div className="w-59 h-50 bg-white rounded-md p-2">
        <img
          src={logo}
          alt="Logo"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-59 bg-white rounded-md p-3 mt-11">
        <h1 className="text-xl font-bold">Seguidos y por seguir</h1>
        <div className="flex items-center mt-2">  
          </div>
          </div>

      <div className="w-59 bg-white rounded-md p-3 mt-6 max-h-96 overflow-y-scroll">
        {users.map(user => (
          <div key={user.id} className="flex items-center mb-4 p-2 border-b border-gray-300">
            <img
              src={user.avatarurl}
              alt={`${user.name}'s avatar`}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="ml-4">
              <p className="font-bold">{user.name}</p>
              <p className="text-sm text-gray-600">@{user.username}</p>
              <button
                onClick={() => toggleFollow(user.id)}
                className={`mt-2 px-4 py-1 text-sm rounded ${
                  followingIds.includes(user.id) ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                }`}
              >
                {followingIds.includes(user.id) ? 'following' : 'Follow'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Logo;