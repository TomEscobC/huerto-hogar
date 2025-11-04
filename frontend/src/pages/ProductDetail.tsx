import React, { useState } from 'react';
import { Container, Row, Col, Image, Button, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

// Define the Product interface
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  // Sample product - in a real app this would come from an API or context
  const product: Product | undefined = {
    id: id || 'unknown',
    name: 'Producto Detallado',
    description: 'Este es un producto de alta calidad, fresco y orgánico. Perfecto para una alimentación saludable y sostenible.',
    price: 3000,
    image: '/assets/image/manzana-fuji.jpg', // Placeholder - should be dynamic in real app
    category: 'frutas'
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    // Get existing cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex((item: any) => item.id === product.id);
    
    if (existingProductIndex >= 0) {
      // If product exists, increase quantity by the selected amount
      cart[existingProductIndex].quantity += quantity;
    } else {
      // If product doesn't exist, add it with selected quantity
      cart.push({ ...product, quantity: quantity });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show alert
    alert(`"${product.name}" ha sido agregado al carrito (${quantity} ${quantity === 1 ? 'unidad' : 'unidades'}).`);
  };

  if (!product) {
    return (
      <Container className="my-4">
        <Row>
          <Col>
            <h2>Producto no encontrado</h2>
            <Button variant="success" onClick={() => navigate('/products')}>
              Volver a Productos
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} className="img-fluid rounded" />
        </Col>
        <Col md={6}>
          <h1>{product.name}</h1>
          <p className="lead">{product.description}</p>
          <h3 className="text-success">${product.price.toLocaleString('es-CL')} CLP</h3>
          
          <div className="mt-4">
            <div className="d-flex align-items-center mb-3">
              <label className="me-2">Cantidad:</label>
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="mx-3">{quantity}</span>
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
            
            <Button variant="success" size="lg" className="w-100 mb-2" onClick={handleAddToCart}>
              <i className="bi bi-cart-plus"></i> Agregar al Carrito
            </Button>
            
            <Button 
              variant="outline-secondary" 
              className="w-100" 
              onClick={() => navigate('/products')}
            >
              Volver a Productos
            </Button>
          </div>
        </Col>
      </Row>
      
      <Row className="mt-5">
        <Col>
          <Card>
            <Card.Header>
              <h4>Detalles del Producto</h4>
            </Card.Header>
            <Card.Body>
              <p><strong>Categoría:</strong> {product.category}</p>
              <p><strong>Precio por unidad:</strong> ${product.price.toLocaleString('es-CL')} CLP</p>
              <p><strong>Disponibilidad:</strong> En stock</p>
              <p><strong>Origen:</strong> Productos locales y orgánicos</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;