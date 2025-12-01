import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

// Define the Product interface
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');

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
      },
      {
        id: 'VR002',
        name: 'Espinacas Frescas',
        description: 'Espinacas orgánicas ricas en hierro y vitaminas.',
        price: 1500,
        image: '/assets/image/espinaca-fresca.webp',
        category: 'verduras'
      },
      {
        id: 'FR002',
        name: 'Naranjas de Valencia',
        description: 'Naranjas jugosas y ricas en vitamina C.',
        price: 800,
        image: '/assets/image/naranja-valencia.jpg',
        category: 'frutas'
      },
      {
        id: 'PO002',
        name: 'Pimentón de Colores',
        description: 'Pimentón variado de colores orgánicos.',
        price: 2000,
        image: '/assets/image/pimenton-colores.jpg',
        category: 'organicos'
      }
    ];
    
    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
  }, []);

  // Handle filtering and searching
  useEffect(() => {
    let result = products;
    
    // Apply category filter
    if (selectedCategory !== 'todos') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, searchTerm, products]);

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

  // Clear filters function
  const handleClearFilters = () => {
    setSelectedCategory('todos');
    setSearchTerm('');
  };

  return (
    <Container className="my-4">
      {/* Título de la Página */}
      <section className="my-4">
        <h1 className="text-center mb-4">Nuestro Catálogo de Productos</h1>
        <p className="text-center lead">Descubre la frescura y calidad del campo directamente en tu hogar.</p>
      </section>

      {/* Filtros */}
      <section className="my-4">
        <div className="row align-items-end">
          <Col md={4} className="mb-3">
            <Form.Label htmlFor="filtroCategoria">Filtrar por Categoría:</Form.Label>
            <Form.Select 
              id="filtroCategoria" 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="todos" selected>Todos los Productos</option>
              <option value="frutas">Frutas Frescas</option>
              <option value="verduras">Verduras Orgánicas</option>
              <option value="organicos">Productos Orgánicos</option>
              <option value="lacteos">Productos Lácteos</option>
            </Form.Select>
          </Col>
          <Col md={4} className="mb-3">
            <Form.Label htmlFor="busquedaProducto">Buscar Producto:</Form.Label>
            <Form.Control 
              type="text" 
              id="busquedaProducto" 
              placeholder="Ej: Manzana, Miel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={4} className="mb-3">
            <Button 
              id="btnLimpiarFiltros" 
              className="w-100" 
              variant="outline-secondary"
              onClick={handleClearFilters}
            >
              Limpiar Filtros
            </Button>
          </Col>
        </div>
      </section>

      {/* Contenedor de Productos */}
      <section className="my-4">
        <Row id="contenedorProductos">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Col md={4} key={product.id} className="mb-4">
                <ProductCard 
                  product={product} 
                  onAddToCart={handleAddToCart} 
                />
              </Col>
            ))
          ) : (
            <Col className="text-center">
              <p>No se encontraron productos que coincidan con los filtros.</p>
            </Col>
          )}
        </Row>
      </section>
    </Container>
  );
};

export default Products;