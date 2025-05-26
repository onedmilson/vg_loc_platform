import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  return (
    <section className="testimonials" id="testimonials">
      <h2>Depoimentos</h2>
      <div className="testimonials-grid">
        <div className="testimonial-card">
          <p>"Excelente atendimento! Os equipamentos chegaram no prazo e em ótimo estado."</p>
          <span>- João Silva, Engenheiro</span>
        </div>
        <div className="testimonial-card">
          <p>"Recomendo muito a VG LOC. Me ajudaram muito na obra com suporte e rapidez."</p>
          <span>- Maria Oliveira, Arquiteta</span>
        </div>
        <div className="testimonial-card">
          <p>"Melhor custo-benefício que encontrei no mercado. Atendimento nota 10."</p>
          <span>- Carlos Mendes, Mestre de obras</span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
