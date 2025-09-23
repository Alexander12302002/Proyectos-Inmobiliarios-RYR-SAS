import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProtectedRoute from './assets/token/ProtectedRoute';
import { useState } from 'react'
import './assets/styles/index.css'
import Home from './assets/pages/Home'
import Property from './assets/pages/Property'
import Propertys from './assets/pages/Propertys'
import About from './assets/pages/About'
import Login from './assets/pages/login'
import Management from './assets/pages/Management';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Propiedades' element={<Propertys />} />
        <Route path='/Propiedades/:id' element={<Property />} />
        <Route path='/Nosotros' element={<About />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Management' element={<ProtectedRoute><Management /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App
