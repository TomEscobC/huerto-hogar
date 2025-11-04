import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Header: React.FC = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Load cart count from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalItems = cart.reduce((total: number, item: any) => total + item.quantity, 0);
    setCartCount(totalItems);
  }, []);

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
          </Nav>
          
          <Nav className="ms-auto mb-2 mb-lg-0">
            <LinkContainer to="/login">
              <Nav.Link><i className="bi bi-box-arrow-in-right"></i> Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
              <Nav.Link><i className="bi bi-person-plus"></i> Registro</Nav.Link>
            </LinkContainer>
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