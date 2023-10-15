import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {supabase} from './lib/SupabasseClient'



const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data: existingUsers, error: existingUsersError } = await supabase
            .from('users')
            .select('user_name')
            .eq('user_name', formData.username)
          
            const { data: existingEmail, error: existingEmailError } = await supabase
            .from('users')
            .select('email')
            .eq('email', formData.email)
    
            if (existingUsers && existingUsers.length > 0 || existingEmail && existingEmail.length > 0) {
                alert('Ya existe un usuario con el mismo username o email. Por favor, elige otro.');
            } else {
                console.log(formData.email)
                const { data, error } = await supabase.from('users').insert([
                    {
                        name: formData.name,
                        user_name: formData.username,
                        password: formData.password,
                        email: formData.email,
                    },
                ]);
                if (error) {
                    alert('Error al insertar en la base de datos:', error);
                } else {
                    alert('Registro exitoso:');
                    window.location.reload();
                }
            }
        } catch (error) {
            alert('Error al interactuar con Supabase:', error);
        }
    };
    

    return (
        <div className=" bg-blue-200 flex justify-center items-center h-screen w-4/5 ">
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
