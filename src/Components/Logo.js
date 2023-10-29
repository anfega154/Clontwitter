import React from 'react';
import logo from '../assets/img/logo.PNG';

function Logo () {
  return (
    <div className="absolute inset-y-0 right-0 w-1/5 bg-gray-100 p-2">
      <div className="w-59 h-50 bg-white rounded-md p-2">
        <img
          src={logo}
          alt="Logo"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-59 h-84 bg-white rounded-md p-2 mt-8">
        <img
          src="https://i0.wp.com/lopezdoriga.com/wp-content/uploads/2018/08/twitter-unfollow1.jpg?resize=675%2C1200&ssl=1"
          alt="Logo"
          className="w-full h-60 object-cover"
        />
      </div>
    </div>
  );
};

export default Logo;
