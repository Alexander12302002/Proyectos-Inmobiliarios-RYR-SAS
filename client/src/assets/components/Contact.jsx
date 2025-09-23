import React, { useState } from 'react';

const Contact = () => {
    const [result, setResult] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult('Enviando...');

        const formData = new FormData(event.target);
        formData.append('access_key', '9d7cb13d-c834-4538-9d1d-a30d41215149');

        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            setResult('✅ Mensaje enviado correctamente');
            event.target.reset();
        } else {
            setResult('❌ Ocurrió un error al enviar');
            console.error(data);
        }
    };

    return (
        <div className="h-[100vh] bg-[url('/tash/fondo-habitacion.png')] bg-cover bg-center flex items-center justify-center">
            <div className="w-[100vw] flex items-center justify-center">
                <div className="w-[400px] flex items-center justify-center">
                    <div className="bg-[#100E2C] h-[600px] flex items-center justify-center flex-col rounded-lg w-full max-w-lg">
                        <h2 className="text-2xl font-bold mb-6 text-white text-center">Contáctanos</h2>

                        <form className="space-y-4 flex flex-col gap-[10px]" onSubmit={onSubmit}>
                            <div>
                                <label htmlFor="nombre" className="flex justify-center text-white font-medium">Nombre</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="name"
                                    required
                                    className="bg-white w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="flex justify-center text-white font-medium">Correo electrónico</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="bg-white w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="telefono" className="flex justify-center text-white font-medium">Teléfono</label>
                                <input
                                    type="tel"
                                    id="telefono"
                                    name="phone"
                                    className="bg-white w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="mensaje" className="flex justify-center text-white font-medium">Mensaje</label>
                                <textarea
                                    id="mensaje"
                                    name="message"
                                    rows="5"
                                    maxLength="2500"
                                    required
                                    className="bg-white w-full border border-gray-300 rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Escribe tu mensaje (máx. 500 palabras)"
                                ></textarea>
                                <p className="text-sm text-gray-500 mt-1">Máximo 500 palabras (~2500 caracteres).</p>
                            </div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-[#0057FF] hover:bg-blue-700 text-white font-semibold p-1 rounded shadow"
                                >
                                    Enviar mensaje
                                </button>
                            </div>

                            {result && (
                                <p className="text-sm text-white text-center">{result}</p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
