import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import House from '../../../public/About/Icon.png'
import House2 from '../../../public/About/expensive-house.png'
import House3 from '../../../public/About/closed-barn.png'
import House4 from '../../../public/About/Icon.png'; // o el ícono que tengas
import Header from '../components/Header';
import Footer from '../components/Footer';
import Carts from '../components/Carts';

const About = () => {
    return (
        <div>
            <Header />
            <div className='h-[85vh] p-[10px] flex'>
                <div className='flex items-center justify-center'>
                    <div className='w-[50vw] flex justify-center'>
                        <div className='w-[50vw] flex justify-center'>
                            <video
                                src="/About/Video-Presentacion-RYR-SAS.mp4"
                                className="w-[300px] h-[500px] rounded-lg shadow-lg object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                            ></video>

                        </div>
                    </div>
                    <div className='w-[40vw] flex flex-col p-[10px]'>
                        <div>
                            <h1 className=' text-3xl font-bold mb-4'>Asesoramiento experto para todas sus necesidades inmobiliarias</h1>
                            <p >¡Bienvenidos a Gestora de Proyectos Inmobiliarios RYR S.A.S.!
                                Somos una empresa familiar apasionada por crear valor a través de soluciones integrales en bienes raíces y remodelación. Nuestro propósito es acompañarlo en cada paso, desde la compra o venta de su inmueble hasta la transformación y cuidado de su hogar, con la confianza y transparencia que nos caracteriza.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='min-h-[100vh] p-8'>
                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-bold mb-4'>El éxito de nuestros clientes es nuestro éxito.</h1>
                    <p className='text-gray-700 text-lg max-w-2xl mx-auto'>
                        Sabemos que no buscas solo una casa, sino un lugar donde empezar nuevas historias. Estamos aquí para ayudarte a encontrarlo.
                    </p>
                </div>

                <div className='flex flex-wrap justify-center gap-8 mt-10'>

                    {/* Tarjeta 1 - Refacción de casas */}
                    <div className='w-full sm:w-[250px] bg-[#100E2C] rounded-lg shadow-md p-6 hover:shadow-xl transition flex items-center flex-col'>
                        <img className='h-[50px] w-[50px]' src={House4} />
                        <h2 className='text-white text-xl font-semibold text-center mb-2'>remodelación de casas</h2>
                        <p className='text-white text-sm text-center'>
                            Transforma tu hogar con nuestros servicios de remodelación, adaptados a tu estilo y necesidades.
                        </p>
                    </div>
                    {/* Tarjeta 2 */}
                    <div className='w-full sm:w-[250px] bg-[#100E2C] rounded-lg shadow-md p-6 hover:shadow-xl transition flex items-center flex-col'>
                        <img className='h-[50px] w-[50px]' src={House} />
                        <h2 className='text-white text-xl font-semibold text-center mb-2'>Compra de propiedades</h2>
                        <p className='text-white text-sm text-center'>
                            Encuentra la propiedad perfecta para ti con nuestro acompañamiento experto y seguro.
                        </p>
                    </div>

                    {/* Tarjeta 3 */}
                    <div className='w-full sm:w-[250px] bg-[#100E2C] rounded-lg shadow-md p-6 hover:shadow-xl transition flex items-center flex-col'>
                        <img className='h-[50px] w-[50px]' src={House2} />
                        <h2 className='text-white text-xl font-semibold text-center mb-2'>Venta de propiedades</h2>
                        <p className='text-white text-gray-600 text-sm text-center'>
                            Vende tu inmueble con asesoría profesional, logrando el mejor valor de mercado.
                        </p>
                    </div>

                    {/* Tarjeta 4 */}
                    <div className='w-full sm:w-[250px] bg-[#100E2C] rounded-lg shadow-md p-6 hover:shadow-xl transition flex items-center flex-col'>
                        <img className='h-[50px] w-[50px]' src={House3} />
                        <h2 className='text-white text-xl font-semibold text-center mb-2'>Renta de propiedades</h2>
                        <p className='text-white text-gray-600 text-sm text-center'>
                            Alquila tu propiedad de forma rápida y segura, o encuentra el lugar ideal para ti.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default About;
