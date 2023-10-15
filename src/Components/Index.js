import React, { useState  } from 'react'
import { Link,useNavigate  } from 'react-router-dom';



function Index() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();


    const handleLogin = () => {
        // console.log("Email:", email);
        // console.log("Contraseña:", password);
        navigate('/home');
        };

    const handleRegister = () => {

    }

    return (
        <div className="flex justify-center items-center h-screen w-5/5 bg-blue-300">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-3xl font-semibold text-center mb-4">Iniciar sesión</h2>
                <input
                    type="text"
                    placeholder="Correo electrónico"
                    className="w-full p-2 border rounded mb-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="w-full p-2 border rounded mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="w-full bg-blue-400 text-white p-2 rounded hover:bg-blue-500 mb-2"
                    onClick={handleLogin}
                >
                    Iniciar sesión
                </button>

                <button
                    className="w-full bg-gray-400 text-white p-2 rounded hover:bg-gray-600"

                >
                    <Link to="/register">Registrarse</Link>


                </button>
                <a
                    href='/'
                    className="text-blue-500 hover:underline mt-4 block"
                >
                    Olvidate tu Contraseña?
                </a>

            </div>
        </div>
    );

}

export default Index