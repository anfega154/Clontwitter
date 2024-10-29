import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Post } from './lib/Fetch';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        age: '',
        phone: '',
        avatarurl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png',
        date: '' 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === 'date') {
            const birthDate = new Date(value);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                setFormData((prevData) => ({ ...prevData, age: age - 1 }));
            } else {
                setFormData((prevData) => ({ ...prevData, age }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = Post('/api/v1/user', formData);
            if (!result.status && !result.success) {
                toast.error(`Error al insertar datos: ${result.message}`);
            } else {
                toast.success('Registro exitoso');
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        } catch (error) {
            toast.error('Error', error);
        }
    };

    return (
        <div className="bg-gray-900 flex justify-center items-center h-screen w-4/5">
            <form className="bg-white shadow-md rounded px-20 pt-10 pb-8 mb-4" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-center mb-4">Registro</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Nombre
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
                        Apellido
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="lastname"
                        name="lastname" 
                        value={formData.lastname}
                        onChange={handleChange} 
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
                        Telefono
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        id="phone"
                        name="phone" 
                        value={formData.phone}
                        onChange={handleChange} 
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Nombre de usuario
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Correo electrónico
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                        Fecha de nacimiento
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Contraseña
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="flex items-center justify-center">
                    <button
                        className="w-full mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Registrarse
                    </button>
                </div>

                <div>
                    <button
                        className="w-full bg-gray-400 text-white p-2 rounded hover:bg-gray-600"
                    >
                        <Link to="/">Volver al Inicio</Link>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;