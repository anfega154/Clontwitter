import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './lib/SupabasseClient'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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
                toast.error('Ya existe un usuario con el mismo username o email. Por favor, elige otro.');
            } else {
                console.log(formData.email)
                const { data, error } = await supabase.from('users').insert([
                    {
                        name: formData.name,
                        user_name: formData.username,
                        password: formData.password,
                        email: formData.email,
                        avatar_url: 'data:image/png;base64,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'
                    },
                ]);
                if (error) {
                    toast.error('Error al insertar en la base de datos:', error);
                } else {
                    toast.success('Registro exitoso');
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                }
            }
        } catch (error) {
            toast.error('Error al interactuar con Supabase:', error);
        }
    };


    return (
        <div className=" bg-gray-900 flex justify-center items-center h-screen w-4/5 ">
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
                </div>    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Apellido
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="lastaname"
                        name="lastaname"
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
            
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Fecha de nacimiento
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="date"
                        id="date"
                        name="date"
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
