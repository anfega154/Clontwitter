import React from 'react';

const UserCard = ({ avatarUrl, name, username, age, isFollowing, onFollow }) => {
  return (
    <div className="flex items-center p-2 bg-white shadow rounded mb-2 w-48">
      <img src={avatarUrl} alt={`${name}'s avatar`} className="rounded-full h-10 w-10 mr-2" />
      <div>
        <h3 className="text-sm font-semibold">{name}</h3>
        <p className="text-xs text-gray-600">@{username}</p>
        <p className="text-xs text-gray-500">Edad: {age}</p>
        {!isFollowing && (
          <button
            onClick={onFollow}
            className={`mt-2 px-4 py-1 text-sm rounded bg-blue-500 text-white`}
          >
            Seguir
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
