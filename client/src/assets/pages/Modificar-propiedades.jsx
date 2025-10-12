import { useEffect, useState } from 'react';
import LateralMenu from '../components/LateralMenu';

const ModificarPropiedades = () => {
  const [propiedades, setPropiedades] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [formData, setFormData] = useState(null);
  const [mensaje, setMensaje] = useState('');

  // Cargar todas las propiedades al inicio
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/propiedades/all`);
        const data = await resp.json();
        setPropiedades(data);
      } catch (err) {
        console.error('Error fetch propiedades:', err);
      }
    };
    fetchAll();
  }, []);

  // Cuando cambias la propiedad seleccionada, cargar sus datos
  useEffect(() => {
    if (!selectedId) {
      setFormData(null);
      return;
    }
    const fetchOne = async () => {
      try {
        const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/propiedades/${selectedId}`);
        const data = await resp.json();
        // Mapear a estructura de formulario
        setFormData({
          nombre: data.nombre || '',
          direccion: data.direccion || '',
          precio: data.precio || '',
          habitaciones: data.habitaciones || '',
          banos: data.banos || '',
          metros: data.metros || '',
          tipoOperacion: data.tipoOperacion || 'venta',
          descripcion: data.descripcion || '',
          mapsUrl: data.mapsUrl || '',
          imagenes: data.imagenes && Array.isArray(data.imagenes) ? data.imagenes : [''],
          activo: data.activo === true, // booleano
        });
        setMensaje('');
      } catch (err) {
        console.error('Error fetch propiedad:', err);
      }
    };
    fetchOne();
  }, [selectedId]);

  const handleChange = (e, index = null) => {
    const { name, value, type, checked } = e.target;
    if (name === 'imagenes' && index !== null) {
      const imgs = [...formData.imagenes];
      imgs[index] = value;
      setFormData(prev => ({ ...prev, imagenes: imgs }));
    } else if (name === 'activo') {
      // checkbox para activo
      setFormData(prev => ({ ...prev, activo: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const agregarCampoImagen = () => {
    setFormData(prev => ({
      ...prev,
      imagenes: [...(prev.imagenes || []), ''],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedId) {
      setMensaje('Seleccione una propiedad primero');
      return;
    }

    // Construir payload
    const payload = {
      nombre: formData.nombre,
      direccion: formData.direccion,
      precio: Number(formData.precio),
      habitaciones: parseInt(formData.habitaciones),
      banos: parseInt(formData.banos),
      metros: formData.metros ? parseInt(formData.metros) : undefined,
      tipoOperacion: formData.tipoOperacion,
      descripcion: formData.descripcion,
      mapsUrl: formData.mapsUrl,
      imagenes: formData.imagenes,
      activo: formData.activo,
    };

    try {
      const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/propiedades/${selectedId}`, {
        method: 'PUT', // o PATCH si tu backend lo acepta
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const errData = await resp.json();
        setMensaje(`Error: ${JSON.stringify(errData.errors || errData, null, 2)}`);
        return;
      }

      setMensaje('✅ Propiedad modificada exitosamente');
    } catch (err) {
      console.error('Error modificar:', err);
      setMensaje('❌ Error al modificar propiedad');
    }
  };

  return (
    <div className="flex">
      <LateralMenu />
      <div className="flex-1 p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 border-b pb-4">Modificar Propiedad</h1>

        {/* Selector de propiedad */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Seleccionar Propiedad:</label>
          <select
            className="w-full border-gray-300 border rounded px-4 py-2"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            <option value="">-- Seleccione --</option>
            {propiedades.map((p) => (
              <option key={p._id} value={p._id}>
                {p.nombre} — {p.direccion}
              </option>
            ))}
          </select>
        </div>

        {formData && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Dirección <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Precio <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Habitaciones <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="habitaciones"
                  value={formData.habitaciones}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Baños <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="banos"
                  value={formData.banos}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Metros cuadrados</label>
                <input
                  type="number"
                  name="metros"
                  value={formData.metros}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tipo de operación <span className="text-red-500">*</span></label>
                <select
                  name="tipoOperacion"
                  value={formData.tipoOperacion}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                >
                  <option value="venta">Venta</option>
                  <option value="alquiler">Alquiler</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Google Maps URL <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="mapsUrl"
                  value={formData.mapsUrl}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Descripción <span className="text-red-500">*</span></label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  rows="4"
                  className="w-full border border-gray-300 rounded px-4 py-2 resize-none"
                  required
                />
              </div>
            </div>

            {/* Imágenes */}
            <div className="pt-4">
              <h3 className="font-semibold mb-2">Imágenes (URLs)</h3>
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
              <button
                type="button"
                onClick={agregarCampoImagen}
                className="text-blue-600 text-sm mt-1 hover:underline"
              >
                + Agregar otra imagen
              </button>
            </div>

            {/* Campo para activar/desactivar */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="activo"
                checked={formData.activo}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <label className="text-sm font-medium">Activo</label>
            </div>

            <div className="flex justify-center pt-6">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded font-medium transition"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        )}

        {mensaje && (
          <pre className="bg-gray-100 p-4 rounded mt-6 text-sm whitespace-pre-wrap border text-red-600">
            {mensaje}
          </pre>
        )}
      </div>
    </div>
  );
};

export default ModificarPropiedades;
