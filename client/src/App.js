import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Equipamentos from './components/equipamentos/Equipamentos';
import Services from './components/services/Services';
import Testimonials from './components/testimonials/Testimonials';
import About from './components/about/About';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard'; // <-- Aqui importa seu dashboard

// Função que verifica se o usuário está autenticado
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Componente para rotas protegidas
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Equipamentos />
              <Services />
              <Testimonials />
              <About />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
      </Routes>
    </div>
  );
}

export default App;


