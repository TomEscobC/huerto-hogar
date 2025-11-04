import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Card, Alert, Row, Col } from 'react-bootstrap';

// Define the CartItem interface
interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);

  // Load cart data from localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
    
    // Calculate total
    const total = cart.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
    
    setCartTotal(total);
  }, []);

  // Update quantity of an item in the cart
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return; // Don't allow quantities less than 1
    
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Recalculate total
    const total = updatedCart.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
    
    setCartTotal(total);
  };

  // Remove item from cart
  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Recalculate total
    const total = updatedCart.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
    
    setCartTotal(total);
    
    alert('Producto eliminado del carrito');
  };

  // Empty the entire cart
  const emptyCart = () => {
    if (window.confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
      setCartItems([]);
      setCartTotal(0);
      localStorage.removeItem('cart');
    }
  };

  // Process checkout
  const processCheckout = () => {
    if (cartItems.length === 0) {
      alert("Tu carrito está vacío. Agrega productos antes de proceder al pago.");
      return;
    }
    
    alert(`Simulación de Pago:\nTotal a pagar: $${cartTotal.toLocaleString('es-CL')} CLP\n\n¡Gracias por tu compra en HuertoHogar!`);
  };

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-CL', { 
      style: 'currency', 
      currency: 'CLP',
      minimumFractionDigits: 0 
    }).format(amount);
  };

  return (
    <Container className="my-4">
      {/* Título de la Página */}
      <section className="my-4">
        <h1 className="text-center mb-4"><i className="bi bi-cart3"></i> Tu Carrito de Compras</h1>
      </section>

      {/* Contenido del Carrito */}
      <section className="my-4">
        <div id="carritoContenido">
          {cartItems.length === 0 ? (
            // Cart is empty
            <Alert variant="info" className="text-center">
              <i className="bi bi-cart-x"></i> Tu carrito está vacío. 
              <a href="/products" className="alert-link">¡Explora nuestros productos!</a>
            </Alert>
          ) : (
            // Cart has items
            <Card>
              <Card.Header className="bg-success text-white">
                <h5 className="mb-0"><i className="bi bi-list"></i> Resumen de Productos</h5>
              </Card.Header>
              <Card.Body>
                <div className="table-responsive">
                  <Table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">Producto</th>
                        <th scope="col">Precio Unitario</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Subtotal</th>
                        <th scope="col">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => {
                        const subtotal = item.price * item.quantity;
                        return (
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{formatCurrency(item.price)}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <Button 
                                  variant="outline-secondary" 
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </Button>
                                <span className="mx-2">{item.quantity}</span>
                                <Button 
                                  variant="outline-secondary" 
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  +
                                </Button>
                              </div>
                            </td>
                            <td><strong>{formatCurrency(subtotal)}</strong></td>
                            <td>
                              <Button 
                                variant="danger" 
                                size="sm" 
                                className="eliminar-item"
                                onClick={() => removeItem(item.id)}
                              >
                                <i className="bi bi-trash"></i> Eliminar
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
                
                <hr />
                
                <Row className="justify-content-end">
                  <Col md={4}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="mb-0">Total:</h5>
                      <h4 className="mb-0 text-success"><strong>{formatCurrency(cartTotal)}</strong></h4>
                    </div>
                    <div className="d-grid gap-2">
                      <Button id="btnVaciarCarrito" variant="outline-danger" onClick={emptyCart}>
                        <i className="bi bi-cart-x"></i> Vaciar Carrito
                      </Button>
                      <Button id="btnProcederCompra" variant="success" onClick={processCheckout}>
                        <i className="bi bi-credit-card"></i> Proceder al Pago
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </div>
      </section>
    </Container>
  );
};

export default Cart;