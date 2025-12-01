import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer text-center text-lg-start mt-auto">
      <Container className="p-4">
        <Row>
          <Col lg={6} md={12} className="mb-4 mb-md-0">
            <h5 className="text-uppercase">HuertoHogar</h5>
            <p>
              Conectamos a las familias chilenas con el campo, promoviendo un estilo de vida saludable y sostenible.
            </p>
          </Col>
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase">Enlaces</h5>
            <ul className="list-unstyled mb-0">
              <li><Link to="/" className="text-white">Inicio</Link></li>
              <li><Link to="/about" className="text-white">Nosotros</Link></li>
              <li><Link to="/products" className="text-white">Productos</Link></li>
              <li><Link to="/contact" className="text-white">Contacto</Link></li>
            </ul>
          </Col>
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase">Contacto</h5>
            <ul className="list-unstyled mb-0">
              <li><i className="bi bi-envelope"></i> contacto@huertohogar.cl</li>
              <li><i className="bi bi-telephone"></i> +56 2 1234 5678</li>
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; 2025 HuertoHogar. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;