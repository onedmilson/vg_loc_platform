import React from "react";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const companyName = "VG LOC Service";
  const email = "vg@email.com";
  const phone = "+55 (85) 99999-9999";
  const address = "Caucaia - Ceará";

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2>{companyName}</h2>
          <p>{address}</p>
        </div>

        <div className="footer-section">
          <h3>Contato</h3>
          <p>Email: <a href={`mailto:${email}`}>{email}</a></p>
          <p>Telefone: <a href={`tel:${phone}`}>{phone}</a></p>
        </div>

        <div className="footer-section">
          <h3>Links Úteis</h3>
          <ul>
            <li><a href="/sobre">Sobre Nós</a></li>
            <li><a href="/termos">Termos de Uso</a></li>
            <li><a href="/privacidade">Política de Privacidade</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Redes Sociais</h3>
          <ul>
            <li><a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a href="https://www.github.com" target="_blank" rel="noreferrer">GitHub</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © {currentYear} {companyName}. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
