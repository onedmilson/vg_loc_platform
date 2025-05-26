import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 importa o hook
import logoDefault from '../../assets/vg-logo.png';
import logoScrolled from '../../assets/vg-logo-2.png';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate(); // 👈 hook para navegação

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginClick = () => {
    navigate('/login'); // 👈 redireciona para a rota /login
  };

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <nav className="nav">
        <a href="/" className="nav__logo">
          <img
            src={scrolled ? logoScrolled : logoDefault}
            alt="vg loc service"
          />
        </a>

        <div className="nav__menu">
          <ul className="nav__list">
            <li className="nav__item"><a href="#home">Home</a></li>
            <li className="nav__item"><a href="#equipamentos">Equipamentos</a></li>
            <li className="nav__item"><a href="#services">Serviços</a></li>
            <li className="nav__item"><a href="#about">Sobre nós</a></li>
          </ul>
        </div>

        <div className="nav__actions">
          <button className="nav__login-btn" onClick={handleLoginClick}>Login</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
