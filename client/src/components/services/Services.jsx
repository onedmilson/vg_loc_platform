import React from 'react';
import './Services.css';

const Services = () => {
  return (
    <section className="services" id="services">
      <h2>Serviços</h2>
      <div className="services-grid">
        <div className="service-card">
          <h3>Locação de Equipamentos</h3>
          <p>Aluguel de máquinas e equipamentos para construção civil com qualidade garantida.</p>
        </div>
        <div className="service-card">
          <h3>Manutenção Preventiva</h3>
          <p>Equipamentos revisados com frequência para evitar falhas no seu projeto.</p>
        </div>
        <div className="service-card">
          <h3>Entrega Rápida</h3>
          <p>Garantimos agilidade e pontualidade na entrega e retirada dos equipamentos.</p>
        </div>
      </div>
    </section>
  );
};

export default Services;
