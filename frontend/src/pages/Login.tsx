import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }
    
    // Mock login logic
    console.log('Login attempt with:', { email, password });
    alert('Inicio de sesión exitoso (simulado)');
  };

  return (
    <Container className="my-4">
      <section className="my-4">
        <h1 className="text-center mb-4">Iniciar Sesión</h1>
        <Row>
          <Col md={6} className="mx-auto">
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Tu email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Tu contraseña" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button variant="success" type="submit">
                  Iniciar Sesión
                </Button>
              </div>
              
              <div className="text-center mt-3">
                <p>¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p>
              </div>
            </Form>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default Login;