import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about" id="about">
      <h2>Sobre Nós</h2>
      <div className="about-content">
        <p>
          A <strong>VG LOC Service</strong> é uma empresa especializada em locação de equipamentos para construção civil.
          Nosso objetivo é oferecer soluções eficientes, com equipamentos modernos, seguros e com excelente custo-benefício.
        </p>
        <p>
          Com uma equipe qualificada e compromisso com a satisfação do cliente, garantimos entregas rápidas, atendimento personalizado
          e suporte técnico em todas as etapas da sua obra.
        </p>
        <p>
          Estamos prontos para te ajudar a construir com qualidade e economia!
        </p>
      </div>
    </section>
  );
};

export default About;
