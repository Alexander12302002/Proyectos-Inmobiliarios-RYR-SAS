import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Carts from '../components/Carts';

const Propertys = () => {
    return (
        <div>
            <Header />
            <div className="w-full flex justify-center ">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Carts />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Propertys;
