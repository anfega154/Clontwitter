import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../Auth/AuthContext";
import logo from '../assets/img/logo.PNG';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Post } from './lib/Fetch';
import { data } from 'autoprefixer';
import { jwtDecode } from "jwt-decode";

function Index() {
    const { dispatch } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const navigate = useNavigate();

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
            const response = await Post('api/v1/login', formData);

            if (response.success) {
                const token = response.body.token;
                localStorage.setItem('token', token);

                const user = jwtDecode(token);

                toast.success('Bienvenido');
                navigate('/home');
                dispatch({
                    type: "LOGIN",
                    payload: {
                        iduser: user.id,
                        username: user.username,
                        avatar: user.avatarurl,
                        name: user.name,
                        email: user.email
                    }
                });
            } else {
                toast.error('Correo o usuario incorrecto');
            }
        } catch (error) {
            toast.error('Error al autenticar: ' + error.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen w-5/5 bg-gray-900 rounded-lg">
            <div className="bg-white p-1 h-96 rounded-lg shadow-md w-96 mb-8 mr-16 ">
                <img
                    src={logo}
                    alt="Logo"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-3xl font-semibold text-center mb-4">Iniciar sesión</h2>
                <form className="bg-white shadow-md rounded px-26 pt-10 pb-7 mb-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Usuario"
                        className="w-full p-2 border rounded mb-2"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        className="w-full p-2 border rounded mb-4"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button
                        className="w-full bg-blue-400 text-white p-2 rounded hover:bg-blue-500 mb-2"
                        type="submit"
                    >
                        Iniciar sesión
                    </button>

                    <button className="w-full bg-gray-400 text-white p-2 rounded hover:bg-gray-600">
                        <Link to="/register">Registrarse</Link>
                    </button>
                </form>
                <a className="text-blue-500 hover:underline mt-4 block" href="/">
                    <Link to="/"> Olvidaste tu Contraseña?</Link>
                </a>
            </div>

        </div>
    );
}

export default Index;
