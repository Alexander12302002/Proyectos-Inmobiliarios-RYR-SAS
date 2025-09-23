import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Carts from '../components/Carts';

const Property = () => {
    const { id } = useParams();
    const [propiedad, setPropiedad] = useState(null);
    const [infoEspecifica, setInfoEspecifica] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const decodeId = (encodedId) => atob(encodedId);
    const realId = decodeId(id);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const propRes = await fetch(`http://localhost:3000/propiedades/${realId}`);
                const propData = await propRes.json();
                setPropiedad(propData);
                if (propData.imagenes && propData.imagenes.length > 0) {
                    setSelectedImage(propData.imagenes[0]);
                }

                const infoRes = await fetch(`http://localhost:3000/InfoEspecifica/${realId}`);
                const infoData = await infoRes.json();
                setInfoEspecifica(infoData);
            } catch (error) {
                console.error('Error al cargar los datos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, realId]);

    if (loading) return <p className="text-center mt-10">Cargando...</p>;
    if (!propiedad) return <p className="text-center mt-10">Propiedad no encontrada.</p>;

    // 🔄 CORREGIDO: Generar URL sin API Key
    const mapsQuery = encodeURIComponent(propiedad.direccion || 'Colombia');
    const mapsUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

    const mostrarValor = (valor) => {
        if (typeof valor === 'boolean') return valor ? 'Sí' : 'No';
        return valor || 'Por definir';
    };

    return (
        <div className="relative min-h-screen bg-gray-100">
            <Header />

            {/* Imagen Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
                    onClick={() => setIsModalOpen(false)}
                >
                    <img
                        src={selectedImage}
                        alt="Vista completa"
                        className="max-w-[90%] max-h-[90%] object-contain rounded shadow-lg"
                    />
                </div>
            )}

            {/* Detalle principal */}
            <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-6">
                {/* Imagen principal */}
                <div
                    className="md:w-2/3 aspect-video rounded-lg shadow-lg overflow-hidden cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                >
                    <img
                        src={selectedImage}
                        alt="Imagen principal"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>

                {/* Panel lateral */}
                <div className="md:w-1/3 flex flex-col gap-6">
                    {/* Miniaturas */}
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start max-h-[200px] overflow-y-auto">
                        {propiedad.imagenes?.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`Miniatura ${idx + 1}`}
                                className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${img === selectedImage ? 'border-blue-600' : 'border-transparent'}`}
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </div>

                    {/* Info general */}
                    <div className="bg-white p-4 rounded shadow">
                        <h1 className="text-2xl font-bold mb-2">{propiedad.nombre || 'Por definir'}</h1>
                        <p className="text-gray-600 mb-1">{propiedad.direccion || 'Por definir'}</p>
                        <p className="text-lg font-semibold mb-4">
                            {propiedad.precio > 0
                                ? `$${propiedad.precio.toLocaleString('es-CO')}`
                                : 'A consultar'}
                        </p>
                        <div className="flex flex-wrap gap-4 text-gray-700 mb-4">
                            <span><strong>Habitaciones:</strong> {propiedad.habitaciones ?? 'Por definir'}</span>
                            <span><strong>Baños:</strong> {propiedad.banos ?? 'Por definir'}</span>
                            <span><strong>Área:</strong> {propiedad.metros ? `${propiedad.metros} m²` : 'Por definir'}</span>
                            <span><strong>Operación:</strong> {propiedad.tipoOperacion || 'Por definir'}</span>
                        </div>
                    </div>

                    {/* Mapa CORREGIDO */}
                    <div className="bg-white rounded shadow overflow-hidden">
                        <h2 className="text-xl font-semibold p-4 border-b">Ubicación</h2>
                        <iframe
                            title="Mapa propiedad"
                            src={mapsUrl}
                            width="100%"
                            height="250"
                            className="border-0"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>

            {/* Descripción */}
            <div className="max-w-6xl mx-auto px-4 py-6">
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-2xl font-bold mb-4">Descripción</h2>
                    <p className="text-gray-700 whitespace-pre-line">
                        {propiedad.descripcion || 'Por definir'}
                    </p>
                </div>
            </div>

            {/* Información adicional */}
            <div className="max-w-6xl mx-auto px-4 py-6">
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-2xl font-bold mb-4">Información adicional</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-800">
                        <div><strong>Sala - Comedor:</strong> {mostrarValor(infoEspecifica?.sala_comedor)}</div>
                        <div><strong>Estudio:</strong> {mostrarValor(infoEspecifica?.estudio)}</div>
                        <div><strong>Gabinetes Cocina:</strong> {mostrarValor(infoEspecifica?.gabinetes_cocina)}</div>
                        <div><strong>Zona de Ropas:</strong> {mostrarValor(infoEspecifica?.zona_ropas)}</div>
                        <div><strong>Balcón:</strong> {mostrarValor(infoEspecifica?.balcon)}</div>
                        <div><strong>Ascensor:</strong> {mostrarValor(infoEspecifica?.ascensor)}</div>
                        <div><strong>Cocina:</strong> {mostrarValor(infoEspecifica?.cocina)}</div>
                        <div><strong>Pisos:</strong> {mostrarValor(infoEspecifica?.pisos)}</div>
                        <div><strong>Parqueadero:</strong> {mostrarValor(infoEspecifica?.parqueadero)}</div>
                    </div>
                </div>
            </div>

            {/* Propiedades relacionadas */}
            <div className="w-full flex justify-center ">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Carts limit={6} />
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Property;
