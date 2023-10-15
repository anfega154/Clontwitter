import React, { useState } from 'react';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Nombre del Usuario',
    username: 'anfega',
    email: 'correo@example.com',
    profileImage: 'https://elcomercio.pe/resizer/0zoHZLOjzUyr7f1tuip1OQgdCQ4=/580x330/smart/filters:format(jpeg):quality(90)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/LPW4JMM3MZG3DJA5RN5DGY44HU.jpeg',
  });
  const [followers, setFollowers] = useState(['Seguidor1', 'Seguidor2', 'Seguidor3']);
  const [following, setFollowing] = useState(['Siguiendo1', 'Siguiendo2', 'Siguiendo3']);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <div className="absolute inset-y-0 right-0 w-4/5 bg-blue-200 min-h-screen">
      <div className="bg-white rounded shadow-lg p-4">
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
            className="bg-blue-500 text-white p-2 rounded hover-bg-blue-600"
          >
            {isEditing ? 'Guardar' : 'Editar Perfil'}
          </button>
        </div>
        <div className="flex space-x-4">
      <div className="mt-4 p-6">
        <h3 className="text-lg font-semibold">Seguidores:</h3>
        <ul className="list-disc pl-5">
          {followers.map((follower, index) => (
            <li key={index} className="mt-2">{follower}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4 p-6">
        <h3 className="text-lg font-semibold">Siguiendo:</h3>
        <ul className="list-disc pl-5">
          {following.map((followed, index) => (
            <li key={index} className="mt-2">{followed}</li>
          ))}
        </ul>
      </div>
    </div>
      </div>
      
    </div>
  );
};

export default UserProfile;
