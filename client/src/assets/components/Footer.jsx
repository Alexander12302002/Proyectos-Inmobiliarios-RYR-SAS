const Footer = () => {
    return (
        <footer className="bg-[#100E2C] text-white py-10">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Horarios */}
                <div>
                    <h3 className="text-lg font-bold mb-2">Horarios de atención</h3>
                    <p className="text-sm">Lunes a Viernes:</p>
                    <p className="text-sm">8:00 am - 12:00 pm</p>
                    <p className="text-sm">2:00 pm - 6:00 pm</p>
                </div>

                {/* Dirección */}
                <div>
                    <h3 className="text-lg font-bold mb-2">Dirección</h3>
                    <p className="text-sm">Ibagué, Colombia</p>
                </div>

                {/* Navegación */}
                <div>
                    <h3 className="text-lg font-bold mb-2">Navegación</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="/" className="hover:underline">Inicio</a>
                        </li>
                        <li>
                            <a href="/Propiedades" className="hover:underline">Propiedades</a>
                        </li>
                        <li>
                            <a href="/Nosotros" className="hover:underline">Sobre Nosotros</a>
                        </li>
                        <li>
                            <a href="/Contactos" className="hover:underline">Contáctanos</a>
                        </li>
                    </ul>
                </div>

                {/* Redes Sociales */}
                <div>
                    <h3 className="text-lg font-bold mb-2">Síguenos</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a
                                href="https://www.facebook.com/gestoraproyectosinmobiliarios"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                Facebook
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.instagram.com/jorly_gestorainmobiliaria"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                Instagram
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.threads.com/@jorly_gestorainmobiliaria?xmt=AQF0Hiv2Yxnn3fkMW1OlBLGOAgdvovmU7GGUb2XwPDAzQKg"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                Threads
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://aprendiendocongestora.blogspot.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                Blog
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center mt-8 text-sm text-gray-400">
                © {new Date().getFullYear()} Jorly Gestora Inmobiliaria. Todos los derechos reservados.
            </div>
        </footer>
    );
};

export default Footer;
