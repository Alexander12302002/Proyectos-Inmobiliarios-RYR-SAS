import { useState } from 'react';
import LateralMenu from '../components/LateralMenu';

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validarCorreo = (correo) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!formData.nombre.trim() || !formData.correo.trim() || !formData.contraseña.trim()) {
      setMensaje('❌ Todos los campos son obligatorios');
      return;
    }

    if (!validarCorreo(formData.correo)) {
      setMensaje('❌ Correo no válido');
      return;
    }

    if (formData.contraseña.length < 8) {
      setMensaje('❌ La contraseña debe tener al menos 8 caracteres');
      return;
    }

    try {
      const resp = await fetch(`http://localhost:3000/usuario`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await resp.json();

      if (!resp.ok) {
        // Mostrar errores detallados si vienen en `errors`
        if (data.errors) {
          const errores = data.errors.map(err => `• ${err.msg}`).join('\n');
          setMensaje(`❌ Errores:\n${errores}`);
        } else {
          setMensaje(`❌ ${data.message || 'Error al registrar el usuario'}`);
        }
        return;
      }

      setMensaje('✅ Usuario registrado correctamente');
      setFormData({ nombre: '', correo: '', contraseña: '' });

    } catch (err) {
      console.error('Error en el registro:', err);
      setMensaje('❌ Error de red al registrar el usuario');
    }
  };

  return (
    <div className="flex">
      <LateralMenu />
      <div className="flex-1 p-8 max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 border-b pb-4">Registrar Nuevo Usuario</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre completo <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="Ej. Juan Pérez"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Correo electrónico <span className="text-red-500">*</span></label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="usuario@correo.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contraseña <span className="text-red-500">*</span></label>
            <input
              type="password"
              name="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded font-medium transition"
            >
              Registrar
            </button>
          </div>
        </form>

        {mensaje && (
          <pre className="mt-6 text-center text-sm text-red-600 whitespace-pre-wrap">
            {mensaje}
          </pre>
        )}
      </div>
    </div>
  );
};

export default RegisterUser;
