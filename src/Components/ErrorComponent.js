import React from 'react';
import { Link } from 'react-router-dom';


const ErrorComponent = () => {
  return (
    <div className="bg-red-200 p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold text-red-700 mb-2">Error: Debes iniciar sesión</h2>
      <p className="text-gray-800 mb-4">
        Para acceder a esta página, primero debes iniciar sesión.
      </p>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
       <Link to="/">Iniciar sesion</Link>
      </button>
    </div>
  );
};

export default ErrorComponent;
