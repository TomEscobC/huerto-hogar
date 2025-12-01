import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';

// Importar componentes del Admin
import AdminLayout from './admin/layouts/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import AdminProductList from './admin/pages/ProductList';
import AdminProductDetail from './admin/pages/ProductDetail';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        {/* Rutas del Admin - Sin Header/Footer de la tienda */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<AdminProductList />} />
          <Route path="products/:id" element={<AdminProductDetail />} />
        </Route>

        {/* Rutas de la Tienda - Con Header/Footer */}
        <Route
          path="*"
          element={
            <div className="d-flex flex-column min-vh-100">
              <Header />
              <main className="flex-grow-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
