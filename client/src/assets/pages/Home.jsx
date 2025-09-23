import Header from '../components/Header'
import Footer from '../components/Footer'
import Contact from '../components/Contact'
import Carts from '../components/Carts'

const Home = () => {
    return (
        <div>
            <Header />
            <div className="h-[90vh] flex justify-center items-center">
                <div
                    className="w-[80%] max-w-[2000px] h-[500px] border-4 border-white rounded-lg 
                        bg-[url('/Home/rascacielos-al-atardecer.jpg')] bg-cover bg-center 
                        flex flex-col justify-center items-center text-white text-center p-8 shadow-lg"
                >
                    <h1 className="text-white text-3xl font-bold mb-4">
                        Encuentra una casa que se adapte a tu estilo de vida.
                    </h1>
                    <h6 className="text-white text-lg font-light">
                        Más que casas, encontramos tu hogar.
                    </h6>
                </div>
            </div>

            <div className="w-full flex justify-center ">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Carts limit={6} />
                </div>
            </div>

            <div className='h-[110vh] bg-[#100E2C] p-[20px] flex'>
                <div className='flex items-center justify-center'>
                    <div className='w-[50vw] flex justify-center'>
                        <img src='../../../public/tash/Img.png'></img>
                    </div>
                    <div className='w-[40vw] flex flex-col p-[10px]'>
                        <div>
                            <h1 className='text-white text-3xl font-bold mb-4'>Vision</h1>
                            <p className='text-white'>Para el año 2030, seremos una empresa líder en el sector inmobiliario y de remodelaciones en Colombia, reconocida por la excelencia en el servicio, la innovación en nuestros procesos y el impacto social positivo que generamos a través de nuestra fundación.
                                Queremos consolidarnos como la opción preferida de quienes buscan invertir, transformar y proteger su patrimonio, construyendo relaciones duraderas basadas en confianza, profesionalismo y compromiso con la comunidad.</p>
                        </div>
                        <div>
                            <h1 className='text-white text-3xl font-bold mb-4'>Mision</h1>
                            <p className='text-white '>En Gestora de Proyectos Inmobiliarios RYR S.A.S. somos una empresa familiar comprometida con brindar soluciones integrales en bienes raíces y remodelación, ofreciendo a nuestros clientes un servicio transparente, cercano y confiable.
                                Nuestra misión es acompañar a las familias y a los inversionistas en la compra, venta y transformación de sus propiedades, generando bienestar, valorización y confianza a través de una atención personalizada y responsable.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="contact">
                <Contact />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
