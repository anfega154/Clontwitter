import React from 'react';


function Logo () {
  return (
    <div className="absolute inset-y-0 right-0 w-1/5 bg-gray-100 p-2">
      <div className="w-59 h-44 bg-white rounded-md p-2">
        <img
          src="https://phantom-marca.unidadeditorial.es/8fe149666f7f9188a0006d2627e9487a/resize/828/f/webp/assets/multimedia/imagenes/2023/07/24/16902035774204.jpg"
          alt="Logo"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-59 h-84 bg-white rounded-md p-2 mt-8">
        <img
          src="https://i0.wp.com/lopezdoriga.com/wp-content/uploads/2018/08/twitter-unfollow1.jpg?resize=675%2C1200&ssl=1"
          alt="Logo"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Logo;
