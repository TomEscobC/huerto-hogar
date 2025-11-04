import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mensaje enviado con éxito. Nos pondremos en contacto contigo pronto.');
  };

  return (
    <Container className="my-4">
      <section className="my-4">
        <h1 className="text-center mb-4">Contáctanos</h1>
        <Row>
          <Col md={8} className="mx-auto">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Tu nombre" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Tu email" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formSubject">
                <Form.Label>Asunto</Form.Label>
                <Form.Control type="text" placeholder="Asunto del mensaje" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formMessage">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Tu mensaje" required />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button variant="success" type="submit">
                  Enviar Mensaje
                </Button>
              </div>
            </Form>
          </Col>
          <Col md={4} className="mx-auto">
            <h3>Información de Contacto</h3>
            <p><i className="bi bi-envelope"></i> contacto@huertohogar.cl</p>
            <p><i className="bi bi-telephone"></i> +56 2 1234 5678</p>
            <p><i className="bi bi-geo-alt"></i> Santiago, Chile</p>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default Contact;