import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Importa useNavigate

const Login = () => {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // 👈 Hook para redirigir

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/usuario/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo, contraseña }),
            });

            if (response.ok) {
                const data = await response.json();
                document.cookie = `token=${data.token}; path=/`;
                navigate('/Management');
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData.message);
            }
        } catch (error) {
            console.error('Error al hacer login:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-full max-w-sm"
            >
                {/* Logo */}
                <div className="flex justify-center mb-4">
                    <img
                        src="/header/logo_gestora-removebg-preview.png" // 👈 Corrige la ruta de la imagen
                        alt="Logo"
                        className="w-[150px] h-[50px] object-contain"
                    />
                </div>

                <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>

                <label className="block mb-2 text-sm font-medium">Correo</label>
                <input
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    required
                />

                <label className="block mb-2 text-sm font-medium">Contraseña</label>
                <input
                    type="password"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    required
                />

                {error && (
                    <div className="text-red-500 text-sm mb-4">{error}</div>
                )}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                >
                    Iniciar sesión
                </button>
            </form>
        </div>
    );
};

export default Login;
