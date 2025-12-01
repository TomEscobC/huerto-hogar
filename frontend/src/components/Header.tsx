import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Badge, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Header: React.FC = () => {
  const [cartCount, setCartCount] = useState(0);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart count from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalItems = cart.reduce((total: number, item: any) => total + item.quantity, 0);
    setCartCount(totalItems);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="success" variant="dark" expand="lg" className="navbar">
      <div className="container">
        <LinkContainer to="/">
          <Navbar.Brand>
            <i className="bi bi-tree-fill me-2"></i>HuertoHogar
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto mb-2 mb-lg-0">
            <LinkContainer to="/">
              <Nav.Link>Inicio</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>Nosotros</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/products">
              <Nav.Link>Productos</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link>Contacto</Nav.Link>
            </LinkContainer>
            {/* Enlace Admin - solo visible para usuarios admin */}
            {isAuthenticated && isAdmin && (
              <LinkContainer to="/admin">
                <Nav.Link className="text-warning">
                  <i className="bi bi-gear-fill me-1"></i>Admin
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>

          <Nav className="ms-auto mb-2 mb-lg-0">
            {isAuthenticated ? (
              <>
                {/* Usuario autenticado */}
                <NavDropdown
                  title={
                    <span>
                      <img
                        src={user?.avatar}
                        alt={user?.name}
                        style={{ width: '24px', height: '24px', borderRadius: '50%', marginRight: '8px' }}
                      />
                      {user?.name}
                    </span>
                  }
                  id="user-dropdown"
                >
                  <NavDropdown.Item disabled>
                    <small className="text-muted">{user?.role}</small>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  {isAdmin && (
                    <LinkContainer to="/admin">
                      <NavDropdown.Item>
                        <i className="bi bi-gear me-2"></i>Panel Admin
                      </NavDropdown.Item>
                    </LinkContainer>
                  )}
                  <NavDropdown.Item onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                {/* Usuario no autenticado */}
                <LinkContainer to="/login">
                  <Nav.Link><i className="bi bi-box-arrow-in-right"></i> Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link><i className="bi bi-person-plus"></i> Registro</Nav.Link>
                </LinkContainer>
              </>
            )}
            <LinkContainer to="/cart">
              <Nav.Link className="position-relative">
                <i className="bi bi-cart3"></i> Carrito
                {cartCount > 0 && (
                  <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle">
                    {cartCount}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
