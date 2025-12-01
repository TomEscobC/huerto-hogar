import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, Card, Alert, Badge } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { Product } from '../types/product';
import ProductReviews from '../components/ProductReviews';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadProduct(id);
    }
  }, [id]);

  const loadProduct = async (productId: string) => {
    try {
      setLoading(true);
      const data = await getProductById(productId);
      setProduct(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar el producto');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProductIndex = cart.findIndex((item: any) => item.id === product.id);

    if (existingProductIndex >= 0) {
      cart[existingProductIndex].quantity += quantity;
    } else {
      cart.push({ ...product, quantity: quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`"${product.name}" ha sido agregado al carrito (${quantity} ${quantity === 1 ? 'unidad' : 'unidades'}).`);
  };

  if (loading) {
    return (
      <Container className="my-4 text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando producto...</p>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container className="my-4">
        <Alert variant="danger">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error || 'Producto no encontrado'}
        </Alert>
        <Button variant="success" onClick={() => navigate('/products')}>
          Volver a Productos
        </Button>
      </Container>
    );
  }

  const stockStatus = product.stock !== undefined
    ? product.stock > 10
      ? { variant: 'success', text: 'En stock' }
      : product.stock > 0
        ? { variant: 'warning', text: `Últimas ${product.stock} unidades` }
        : { variant: 'danger', text: 'Agotado' }
    : { variant: 'success', text: 'En stock' };

  return (
    <Container className="my-4">
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} className="img-fluid rounded" />
        </Col>
        <Col md={6}>
          <h1>{product.name}</h1>
          <Badge bg="secondary" className="mb-2">{product.category}</Badge>
          <p className="lead">{product.description}</p>
          <h3 className="text-success">${product.price.toLocaleString('es-CL')} CLP</h3>

          <Badge bg={stockStatus.variant} className="mb-3">
            {stockStatus.text}
          </Badge>

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
                disabled={product.stock !== undefined && quantity >= product.stock}
              >
                +
              </Button>
            </div>

            <Button
              variant="success"
              size="lg"
              className="w-100 mb-2"
              onClick={handleAddToCart}
              disabled={product.stock !== undefined && product.stock === 0}
            >
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
              <p><strong>Stock disponible:</strong> {product.stock ?? 'N/A'} unidades</p>
              <p><strong>Origen:</strong> Productos locales y orgánicos</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Sección de Reseñas */}
      <Row>
        <Col>
          <ProductReviews productId={product.id} />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
