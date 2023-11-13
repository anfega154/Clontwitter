import React from 'react';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
<div className="h-screen w-1/5 bg-gray-900 text-white p-8 flex flex-col rounded-md">
        <div className="text-2xl mb-4">✘</div>
      <ul className="space-y-4">
        <li className="flex items-center">
          <FaHome className="mr-2" />
          <Link to="/home">Inicio</Link>
        </li>
        <li className="flex items-center">
          <FaUser className="mr-2" />
          <Link to="/profile">Perfil</Link>
        </li>
        <li className="flex items-center">
          <FaCog className="mr-2" />
          <Link to="/configuracion">Configuración</Link>
        </li>
        <li className="flex items-center">
        <FaCog className="mr-2" />
          <Link to="/">Cerrar sesión</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
