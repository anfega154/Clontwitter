import React from 'react';
import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="h-screen w-1/5 bg-blue-400 text-white p-4 flex flex-col">
      <div className="text-2xl mb-4">Sidebar</div>
      <ul className="space-y-4">
        <li className="flex items-center">
          <FaHome className="mr-2" />
          <Link to="/home">Inicio</Link>
        </li>
        <li className="flex items-center">
          <FaUser className="mr-2" />
          <Link to="/perfil">Perfil</Link>
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
