import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      setMessage('Se ha enviado un correo electrónico de restablecimiento de contraseña.');
    } catch (error) {
      setMessage('Ha ocurrido un error al enviar el correo electrónico de restablecimiento de contraseña.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form className="bg-white p-8 mr-80 rounded shadow-md w-1/3" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Recuperar Contraseña</h2>
        {message && <p className={`text-sm ${message.includes('error') ? 'text-red-500' : 'text-green-500'} mb-4`}>{message}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded font-bold hover:bg-blue-600 focus:outline-none"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Correo de Restablecimiento'}
        </button>
        <button className="w-full bg-gray-400 text-white p-2 mt-4 rounded hover:bg-gray-600">
                        <Link to="/">Cancelar</Link>
                    </button>
      </form>
    </div>
  );
};

export default PasswordReset;
