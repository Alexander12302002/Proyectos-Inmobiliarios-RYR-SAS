import { useState } from 'react';
import LateralMenu from '../components/LateralMenu';

const initialState = {
  nombre: '',
  direccion: '',
  precio: '',
  habitaciones: '',
  banos: '',
  metros: '',
  tipoOperacion: 'venta',
  descripcion: '',
  mapsUrl: '',
  imagenes: [''],
};

const RegisterPropiedades = () => {
  const [formData, setFormData] = useState(initialState);
  const [mensaje, setMensaje] = useState(null);

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;

    if (name === 'imagenes' && index !== null) {
      const nuevasImagenes = [...formData.imagenes];
      nuevasImagenes[index] = value;
      setFormData(prev => ({ ...prev, imagenes: nuevasImagenes }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const agregarCampoImagen = () => {
    setFormData(prev => ({ ...prev, imagenes: [...prev.imagenes, ''] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      precio: Number(formData.precio),
      habitaciones: parseInt(formData.habitaciones),
      banos: parseInt(formData.banos),
      metros: formData.metros ? parseInt(formData.metros) : undefined,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/propiedades/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMensaje(`Error:\n${JSON.stringify(errorData.errors, null, 2)}`);
        return;
      }

      setMensaje('✅ Propiedad registrada exitosamente');
      setFormData(initialState);
    } catch (err) {
      console.error(err);
      setMensaje('❌ Error al registrar la propiedad');
    }
  };

  return (
    <div className="flex">
      <LateralMenu />
      <div className="flex-1 p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 border-b pb-4">Formulario</h1>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">Datos de la propiedad</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block font-medium text-sm mb-1">
                Nombre <span className="text-red-500">*</span>
              </label>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 placeholder-gray-400"
                placeholder="Casa en la playa" required />
            </div>

            <div>
              <label className="block font-medium text-sm mb-1">
                Dirección <span className="text-red-500">*</span>
              </label>
              <input type="text" name="direccion" value={formData.direccion} onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2" placeholder="Calle 123, Ciudad" required />
            </div>

            <div>
              <label className="block font-medium text-sm mb-1">Precio <span className="text-red-500">*</span></label>
              <input type="number" name="precio" value={formData.precio} onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2" placeholder="2000000" required />
            </div>

            <div>
              <label className="block font-medium text-sm mb-1">Habitaciones <span className="text-red-500">*</span></label>
              <input type="number" name="habitaciones" value={formData.habitaciones} onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2" placeholder="3" required />
            </div>

            <div>
              <label className="block font-medium text-sm mb-1">Baños <span className="text-red-500">*</span></label>
              <input type="number" name="banos" value={formData.banos} onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2" placeholder="2" required />
            </div>

            <div>
              <label className="block font-medium text-sm mb-1">Metros cuadrados</label>
              <input type="number" name="metros" value={formData.metros} onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2" placeholder="120" />
            </div>

            <div>
              <label className="block font-medium text-sm mb-1">Tipo de operación <span className="text-red-500">*</span></label>
              <select name="tipoOperacion" value={formData.tipoOperacion} onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2">
                <option value="venta">Venta</option>
                <option value="alquiler">Alquiler</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-sm mb-1">Google Maps URL <span className="text-red-500">*</span></label>
              <input type="text" name="mapsUrl" value={formData.mapsUrl} onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2"
                placeholder="https://maps.google.com/..." required />
            </div>

            <div className="md:col-span-2">
              <label className="block font-medium text-sm mb-1">Descripción <span className="text-red-500">*</span></label>
              <textarea name="descripcion" value={formData.descripcion} onChange={handleChange}
                rows="4"
                className="w-full border border-gray-300 rounded px-4 py-2 resize-none"
                placeholder="Descripción detallada de la propiedad" required />
            </div>
          </div>

          {/* Imagenes */}
          <div className="pt-4">
            <h3 className="font-semibold mb-2">Imágenes <span className="text-red-500">*</span></h3>
            {formData.imagenes.map((img, idx) => (
              <div key={idx} className="mb-3">
                <label className="block text-sm mb-1">Imagen {idx + 1}</label>
                <input
                  type="text"
                  name="imagenes"
                  value={img}
                  onChange={(e) => handleChange(e, idx)}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  placeholder="https://..."
                  required
                />
              </div>
            ))}
            <button type="button" onClick={agregarCampoImagen} className="text-blue-600 text-sm mt-1 hover:underline">
              + Agregar otra imagen
            </button>
          </div>

          <div className="flex justify-center pt-6">
            <button type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded font-medium transition">
              Enviar
            </button>
          </div>
        </form>

        {mensaje && (
          <pre className="bg-gray-100 p-4 rounded mt-6 text-sm whitespace-pre-wrap border text-red-600">
            {mensaje}
          </pre>
        )}
      </div>
    </div>
  );
};

export default RegisterPropiedades;
