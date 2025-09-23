import React, { useState, useEffect } from 'react';
import totalm2 from '../../../public/Home/total-m.png';
import { Link } from 'react-router-dom';

const Carts = ({ limit = null }) => {
    const [propiedades, setPropiedades] = useState([]);

    useEffect(() => {
        const fetchPropiedades = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/propiedades/all`);
                const data = await response.json();

                const shuffled = shuffleArray(data);
                setPropiedades(shuffled);
            } catch (error) {
                console.error('Error al obtener propiedades:', error);
            }
        };

        fetchPropiedades();
    }, []);

    const encodeId = (id) => btoa(id);

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Determinar cuántas propiedades mostrar
    const propiedadesAMostrar = limit ? propiedades.slice(0, limit) : propiedades;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {propiedadesAMostrar.map((prop) => (
                <Link key={prop._id} to={`/propiedades/${encodeId(prop._id)}`}>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden relative hover:shadow-lg transition-shadow duration-300 hover:scale-[1.02] cursor-pointer">
                        <div className="relative">
                            <img
                                src={prop.imagenes[0]}
                                alt={prop.nombre}
                                className="w-full h-44 object-cover"
                            />
                            <div className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-semibold text-white ${prop.tipoOperacion === 'venta' ? 'bg-green-600' : 'bg-blue-600'}`}>
                                {prop.tipoOperacion === 'venta' ? 'Venta' : 'Alquiler'}
                            </div>
                        </div>

                        <div className="pt-4 px-6 pb-5 bg-white">
                            <h2 className="text-base font-semibold text-gray-800">{prop.nombre}</h2>
                            <p className="text-sm text-gray-600">{prop.direccion}</p>
                            <p className="text-gray-900 font-bold mt-1 text-sm">
                                {prop.precio && prop.precio > 0
                                    ? `$${prop.precio.toLocaleString('es-CO')}`
                                    : 'A consultar'}
                            </p>

                            <div className="flex items-center mt-3 gap-4 text-gray-700">
                                {prop.habitaciones > 0 && (
                                    <div className="flex flex-col items-center text-xs">
                                        <div className="flex items-center gap-1">
                                            <img src="https://img.icons8.com/?size=100&id=YrHPrQ4TKSEq&format=png&color=000000" alt="Habitaciones" className="w-4 h-4" />
                                            <span>{prop.habitaciones}</span>
                                        </div>
                                        <span>Habit.</span>
                                    </div>
                                )}
                                {prop.banos > 0 && (
                                    <div className="flex flex-col items-center text-xs">
                                        <div className="flex items-center gap-1">
                                            <img src="https://img.icons8.com/?size=100&id=f6RdMu0EQwYj&format=png&color=000000" alt="Baños" className="w-4 h-4" />
                                            <span>{prop.banos}</span>
                                        </div>
                                        <span>Baños</span>
                                    </div>
                                )}
                                {prop.metros > 0 && (
                                    <div className="flex flex-col items-center text-xs">
                                        <div className="flex items-center gap-1">
                                            <img src={totalm2} alt="Área" className="w-4 h-4" />
                                            <span>{prop.metros}</span>
                                        </div>
                                        <span>M2</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Carts;