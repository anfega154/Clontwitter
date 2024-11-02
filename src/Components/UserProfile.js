// UserProfile.js
import React, { useState, useEffect } from 'react';
import {jwtDecode} from "jwt-decode";
import { Get } from './lib/Fetch';
import { toast } from 'react-toastify';
import UserCard from './User/UserCard';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem('token');
  const user = jwtDecode(token);
  const [userData, setUserData] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    profileImage: user.avatarurl,
  });

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followingIds, setFollowingIds] = useState([]);

  useEffect(() => {
    const getFollowers = async () => {
      try {
        const response = await Get('api/v1/followers?page=1&limit=10', token);
        const { body, success, error } = response;

        if (success) {
          setFollowers(body);
        } else {
          toast.error(`Error fetching followers: ${error}`);
        }
      } catch (error) {
        toast.error(`Error fetching followers: ${error.message}`);
      }
    };

    const getFollowing = async () => {
      try {
        const response = await Get('api/v1/followings?page=1&limit=10', token);
        const { body, success, error } = response;

        if (success) {
          setFollowing(body);
          setFollowingIds(body.map(f => f.followingid));
        } else {
          toast.error(`Error fetching following: ${error}`);
        }
      } catch (error) {
        toast.error(`Error fetching following: ${error.message}`);
      }
    };

    getFollowers();
    getFollowing();
  }, [token]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleFollow = async (followerId) => {
    
    try {
      const response = await Get(`api/v1/follow?followingid=${followerId}`, token);
      const { success, error } = response;

      if (success) {
        toast.success(response.body);
        window.location.reload();
      } else {
        toast.error(`Error following user: ${response.error}`);
      }
    } catch (error) {
      toast.error(`Error following user: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <div className="absolute inset-y-0 right-0 w-4/5 bg-gray-100 h-screen p-4">
      <div className="bg-white rounded shadow-lg h-screen p-4">
        <div className="text-center">
          <img
            src={userData.profileImage}
            alt="Foto de perfil"
            className="rounded-full mx-auto h-20 w-20"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              name="profileImage"
              onChange={handleInputChange}
              className="mt-2"
            />
          )}
        </div>
        <div className="mt-4">
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className="border rounded w-full p-2"
            />
          ) : (
            <h2 className="text-xl font-bold">{userData.name}</h2>
          )}
          <p className="text-gray-600">{userData.email}</p>
          <p className="text-gray-600">{userData.username}</p>
        </div>
        <div className="text-center mt-4">
          <button
            onClick={handleEditClick}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {isEditing ? 'Guardar' : 'Editar Perfil'}
          </button>
        </div>

        <div className="flex justify-between mt-8">
          <div className="flex-1">
            <h3 className="text-lg font-semibold">Seguidores: {followers.length}</h3>
            <div>
              {followers.map(follower => (
                <UserCard
                  key={follower.follower.id}
                  avatarUrl={follower.follower.avatarurl}
                  name={follower.follower.name}
                  username={follower.follower.username}
                  age={follower.follower.age}
                  isFollowing={followingIds.includes(follower.follower.id)}
                  onFollow={() => handleFollow(follower.follower.id)}
                />
              ))}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">Siguiendo: {following.length}</h3>
            <div>
              {following.map(f => (
                <UserCard
                  key={f.following.id}
                  avatarUrl={f.following.avatarurl}
                  name={f.following.name}
                  username={f.following.username}
                  age={f.following.age}
                  isFollowing={true}
                  onFollow={() => {}}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;