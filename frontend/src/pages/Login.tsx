import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Si ya está autenticado, redirigir
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
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
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button variant="success" type="submit" disabled={loading}>
                  {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </Button>
              </div>

              <div className="text-center mt-3">
                <p>¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p>
              </div>

              <hr />
              <div className="text-muted small">
                <p><strong>Usuarios de prueba (password: 123456):</strong></p>
                <p>Admin: nicole@huerto.cl, sara@huerto.cl, henry@huerto.cl</p>
                <p>Usuario: lucas@huerto.cl, daniel@huerto.cl, etc.</p>
              </div>
            </Form>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default Login;
