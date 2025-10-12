import React from 'react';
import { NavLink } from 'react-router-dom';

const LateralMenu = () => {
    const linkStyle = 'block px-4 py-2 text-white hover:bg-blue-700 transition';
    const activeStyle = 'bg-blue-800';

    return (
        <div className="w-64 h-screen bg-blue-900 text-white fixed top-0 left-0 shadow-lg">
            <div className="p-4 border-b border-blue-700 text-center text-xl font-semibold">
                Menú Principal
            </div>
            <nav className="flex flex-col mt-4">
                <NavLink
                    to="/RegisterUser"
                    className={({ isActive }) =>
                        `${linkStyle} ${isActive ? activeStyle : ''}`
                    }
                >
                    Registro de Usuarios
                </NavLink>
                <NavLink
                    to="/RegisterPropiedades"
                    className={({ isActive }) =>
                        `${linkStyle} ${isActive ? activeStyle : ''}`
                    }
                >
                    Registro de Propiedades
                </NavLink>
                <NavLink
                    to="/modificarpropiedades"
                    className={({ isActive }) =>
                        `${linkStyle} ${isActive ? activeStyle : ''}`
                    }
                >
                    Modificar Propiedades
                </NavLink>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `${linkStyle} ${isActive ? activeStyle : ''}`
                    }
                >
                    Inicio
                </NavLink>
            </nav>
        </div>
    );
};

export default LateralMenu;
