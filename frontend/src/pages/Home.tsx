import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';

// Define the Product interface
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const navigate = useNavigate();

  // Define sample products
  useEffect(() => {
    const sampleProducts: Product[] = [
      {
        id: 'FR001',
        name: 'Manzanas Fuji',
        description: 'Crujientes y dulces, cultivadas en el Valle del Maule.',
        price: 1200,
        image: '/assets/image/manzana-fuji.jpg',
        category: 'frutas'
      },
      {
        id: 'VR001',
        name: 'Zanahorias Orgánicas',
        description: 'Crujientes y ricas en vitamina A, cultivadas sin pesticidas.',
        price: 900,
        image: '/assets/image/zanahoria-organica.jpg',
        category: 'verduras'
      },
      {
        id: 'PO001',
        name: 'Miel Orgánica',
        description: 'Miel pura producida por apicultores locales.',
        price: 5000,
        image: '/assets/image/miel-organica.jpeg',
        category: 'organicos'
      },
      {
        id: 'PL001',
        name: 'Leche Entera',
        description: 'Leche fresca de granjas locales responsables.',
        price: 1100,
        image: '/assets/image/leche-entera.jpeg',
        category: 'lacteos'
      }
    ];
    
    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
  }, []);

  // Handle filtering
  useEffect(() => {
    if (selectedCategory === 'todos') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  // Add to cart function
  const handleAddToCart = (product: Product) => {
    // Get existing cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex((item: any) => item.id === product.id);
    
    if (existingProductIndex >= 0) {
      // If product exists, increase quantity
      cart[existingProductIndex].quantity += 1;
    } else {
      // If product doesn't exist, add it with quantity 1
      cart.push({ ...product, quantity: 1 });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show alert
    alert(`"${product.name}" ha sido agregado al carrito.`);
  };

  return (
    <Container className="my-4">
      {/* Banner Promocional */}
      <div className="banner">
        <i className="bi bi-gift"></i> ¡Regístrate ahora y consigue un 10% de descuento con el código <strong>FELICES50</strong>!
      </div>

      {/* Sección de Bienvenida */}
      <section className="my-5 text-center">
        <Image src="/assets/image/logo.jpeg" className="img-fluid w-50 mx-auto d-block" alt="huertohogar" />
        <h1>Bienvenido a HuertoHogar</h1>
        <p className="lead">La frescura y calidad del campo directamente a tu puerta.</p>
        <p>Descubre nuestros productos frescos, orgánicos y cultivados localmente. Conectamos a las familias chilenas con el campo, promoviendo un estilo de vida saludable y sostenible.</p>
        <Button 
          variant="success" 
          className="btn-lg mt-3" 
          onClick={() => navigate('/products')}
        >
          Ver Catálogo
        </Button>
      </section>

      {/* Catálogo de Productos Destacados */}
      <section className="my-5">
        <h2 className="mb-4">Productos Destacados</h2>
        
        {/* Filtros */}
        <div className="mb-4">
          <Form.Label htmlFor="filtroCategoriaIndex">Filtrar por categoría:</Form.Label>
          <Form.Select 
            id="filtroCategoriaIndex" 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="todos" selected>Todos</option>
            <option value="frutas">Frutas Frescas</option>
            <option value="verduras">Verduras Orgánicas</option>
            <option value="organicos">Productos Orgánicos</option>
            <option value="lacteos">Productos Lácteos</option>
          </Form.Select>
        </div>

        {/* Contenedor de Productos */}
        <Row id="contenedorProductosIndex">
          {filteredProducts.map((product) => (
            <Col md={4} key={product.id} className="mb-4">
              <ProductCard 
                product={product} 
                onAddToCart={handleAddToCart} 
              />
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  );
};

export default Home;