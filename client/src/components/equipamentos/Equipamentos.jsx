import React, { useEffect, useState } from 'react';
import './Equipamentos.css';

const Equipamentos = () => {
  const [equipamentos, setEquipamentos] = useState([]);

  useEffect(() => {
    const fetchEquipamentos = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/equipamentos-publicos');
        const data = await response.json();
        setEquipamentos(data);
      } catch (error) {
        console.error('Erro ao buscar equipamentos:', error);
      }
    };

    fetchEquipamentos();
  }, []);

  return (
    <section id="equipamentos" className="equipamentos">
      <h2>Nossos Equipamentos</h2>
      <p>Oferecemos uma ampla variedade de equipamentos para sua obra, desde ferramentas leves até máquinas pesadas.</p>
      <div className="equipamentos-grid">
        {equipamentos.map((equipamento, index) => (
          <div className="equipamento-card" key={index}>
            <strong>{equipamento.name}</strong>
            <p>Disponível: {equipamento.available}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Equipamentos;

