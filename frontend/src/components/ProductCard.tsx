import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <Card className="product-card h-100">
      <Card.Img variant="top" src={product.image} alt={product.name} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text className="flex-grow-1">{product.description}</Card.Text>
        <Card.Text><strong>${product.price.toLocaleString('es-CL')} CLP</strong> por kilo</Card.Text>
        <div className="d-grid gap-2 mt-auto">
          <Button
            variant="success"
            onClick={() => onAddToCart(product)}
          >
            <i className="bi bi-cart-plus me-1"></i> Agregar al Carrito
          </Button>
          <Link to={`/product/${product.id}`} className="btn btn-outline-secondary">
            <i className="bi bi-eye me-1"></i> Ver Detalles
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
