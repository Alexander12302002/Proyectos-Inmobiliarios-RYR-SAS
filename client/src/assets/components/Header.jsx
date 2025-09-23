import React from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    // Función para aplicar estilos al enlace activo
    const isActive = (path) => currentPath === path ? 'underline font-semibold' : '';

    return (
        <div className='text-white flex items-center justify-around h-[10vh]'>
            <div className='flex gap-2.5'>
                <img src="../../../public/header/logo_gestora-removebg-preview.png" className='w-[150px] h-[50px]' />
            </div>
            <div className='flex items-center justify-around gap-2.5'>
                <ul><li><a href='/' className={`text-black ${isActive('/')}`}>Inicio</a></li></ul>
                <ul><li><a href='/Propiedades' className={`text-black ${isActive('/Propiedades')}`}>Propiedades</a></li></ul>
                <ul><li><a href='/Nosotros' className={`text-black ${isActive('/Nosotros')}`}>Sobre Nosotros</a></li></ul>
                <ul><li><a href="/#contact" className={`text-black ${isActive('/Contactos')}`}>Contactanos</a></li></ul>
            </div>
            <div className='flex items-center gap-2.5'>
                <img src="../../../public/header/Icon.png" className='w-[20px] h-[20px]' />
                <a className='text-black' href='/Login'>Inicio</a>
                <img src="../../../public/header/Vector.png" className='w-[20px] h-[20px]' />
                <h1 className='text-black'>(+57) 310 7636277</h1>
            </div>
        </div>
    );
};

export default Header;
