import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from './lib/SupabasseClient'
import { useAuth } from "../Auth/AuthContext";

function Index() {
    const { state, dispatch } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
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
            const { data: existingPass, error: existingPassError } = await supabase
                .from('users')
                .select('password')
                .eq('password', formData.password);

            const { data: existingEmail, error: existingEmailError } = await supabase
                .from('users')
                .select('email,id')
                .eq('email', formData.email)

            if ((existingPass && existingPass.length < 1) || (existingEmail && existingEmail.length < 1)) {
                alert('Correo o usuario incorrecto');
            } else {
                navigate('/home');
                dispatch({ type: "LOGIN", payload: { iduser:existingEmail[0].id } });
            }
        } catch (error) {
            alert('Error al interactuar con Supabase: ' + error.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen w-5/5 bg-blue-200 rounded-lg">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-3xl font-semibold text-center mb-4">Iniciar sesión</h2>
                <form className="bg-white shadow-md rounded px-26 pt-10 pb-7 mb-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="email"
                        placeholder="Correo electrónico"
                        className="w-full p-2 border rounded mb-2"
                        value={formData.email}
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
                <a href="/" className="text-blue-500 hover:underline mt-4 block">
                    Olvidaste tu Contraseña?
                </a>
            </div>
        </div>
    );
}

export default Index;
