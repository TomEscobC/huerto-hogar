import React from 'react';
import { Container } from 'react-bootstrap';

const About: React.FC = () => {
  return (
    <Container className="my-4">
      <section className="my-4">
        <h1 className="text-center mb-4">Sobre Nosotros</h1>
        <div className="row">
          <div className="col-md-8 mx-auto">
            <p>
              En HuertoHogar, nos dedicamos a conectar a las familias chilenas con el campo, 
              promoviendo un estilo de vida saludable y sostenible. Desde nuestros inicios, 
              hemos estado comprometidos con la calidad, la frescura y el respeto por el medio ambiente.
            </p>
            <p>
              Trabajamos directamente con productores locales para traer a tu hogar los mejores 
              productos frescos, orgánicos y cultivados localmente. Cada producto que ofrecemos 
              cumple con altos estándares de calidad y sostenibilidad.
            </p>
            <p>
              Nuestra misión es simple: ofrecer alimentos frescos, nutritivos y de alta calidad, 
              cultivados con prácticas respetuosas con el medio ambiente, directamente del campo 
              a tu hogar, apoyando a nuestras comunidades locales.
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default About;