import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../services/productService';
import { getUsers } from '../../services/userService';
import { getReviews } from '../../services/reviewService';
import { Product, Review } from '../../types/product';
import { useAuth } from '../../context/AuthContext';
import UserProfileCard from '../../components/UserProfileCard';

/**
 * Componente Dashboard - Página principal del admin
 * Muestra KPIs, info del usuario y productos recientes
 */
const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  // Cargar datos al montar el componente
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, usersData, reviewsData] = await Promise.all([
        getProducts(),
        getUsers(),
        getReviews()
      ]);
      setProducts(productsData);
      setUsers(usersData);
      setReviews(reviewsData);
      setError(null);
    } catch (err) {
      setError('Error al cargar los datos. Asegúrate de que Mockoon esté ejecutándose.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Calcular KPIs
  const totalProducts = products.length;
  const categories = Array.from(new Set(products.map(p => p.category)));
  const totalCategories = categories.length;
  const averagePrice = products.length > 0
    ? Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length)
    : 0;
  const totalUsers = users.length;
  const totalReviews = reviews.length;
  const lowStockProducts = products.filter(p => (p.stock ?? 0) <= 5).length;

  // Obtener últimos 5 productos
  const recentProducts = products.slice(0, 5);

  return (
    <div className="container-fluid">
      {/* Encabezado */}
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="h3 mb-2">Dashboard</h1>
          <p className="text-muted">Resumen general del sistema</p>
        </div>
      </div>

      {/* Tarjeta de Perfil de Usuario */}
      {user && <UserProfileCard />}

      {/* KPIs - Primera fila */}
      <div className="row mb-4">
        {/* Total de Productos */}
        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
          <div className="small-box bg-info">
            <div className="inner">
              <h3>{totalProducts}</h3>
              <p>Total de Productos</p>
            </div>
            <div className="icon">
              <i className="bi bi-box-seam"></i>
            </div>
            <Link to="/admin/products" className="small-box-footer">
              Ver todos <i className="bi bi-arrow-right-circle ms-1"></i>
            </Link>
          </div>
        </div>

        {/* Total de Categorías */}
        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
          <div className="small-box bg-success">
            <div className="inner">
              <h3>{totalCategories}</h3>
              <p>Categorías</p>
            </div>
            <div className="icon">
              <i className="bi bi-tag"></i>
            </div>
            <Link to="/admin/products" className="small-box-footer">
              Ver productos <i className="bi bi-arrow-right-circle ms-1"></i>
            </Link>
          </div>
        </div>

        {/* Precio Promedio */}
        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
          <div className="small-box bg-warning">
            <div className="inner">
              <h3>${averagePrice.toLocaleString('es-CL')}</h3>
              <p>Precio Promedio</p>
            </div>
            <div className="icon">
              <i className="bi bi-currency-dollar"></i>
            </div>
            <Link to="/admin/products" className="small-box-footer">
              Ver detalles <i className="bi bi-arrow-right-circle ms-1"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* KPIs - Segunda fila */}
      <div className="row mb-4">
        {/* Total de Usuarios */}
        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
          <div className="small-box bg-primary">
            <div className="inner">
              <h3>{totalUsers}</h3>
              <p>Total de Usuarios</p>
            </div>
            <div className="icon">
              <i className="bi bi-people"></i>
            </div>
            <span className="small-box-footer">
              Usuarios registrados
            </span>
          </div>
        </div>

        {/* Stock Bajo */}
        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
          <div className={`small-box ${lowStockProducts > 0 ? 'bg-danger' : 'bg-secondary'}`}>
            <div className="inner">
              <h3>{lowStockProducts}</h3>
              <p>Stock Bajo</p>
            </div>
            <div className="icon">
              <i className="bi bi-exclamation-triangle"></i>
            </div>
            <Link to="/admin/products" className="small-box-footer">
              {lowStockProducts > 0 ? 'Ver productos' : 'Todo en orden'} <i className="bi bi-arrow-right-circle ms-1"></i>
            </Link>
          </div>
        </div>

        {/* Total de Reseñas */}
        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
          <div className="small-box bg-secondary">
            <div className="inner">
              <h3>{totalReviews}</h3>
              <p>Total de Reseñas</p>
            </div>
            <div className="icon">
              <i className="bi bi-chat-quote"></i>
            </div>
            <span className="small-box-footer">
              Opiniones de clientes
            </span>
          </div>
        </div>
      </div>

      {/* Tabla de Productos Recientes */}
      <div className="row">
        <div className="col-12">
          <div className="card admin-card">
            <div className="card-header admin-card-header">
              <h3 className="card-title">Productos Recientes</h3>
            </div>
            <div className="card-body admin-card-body p-0">
              {loading ? (
                <div className="text-center p-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                  <p className="mt-2">Cargando productos...</p>
                </div>
              ) : error ? (
                <div className="alert alert-danger m-3" role="alert">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped admin-table mb-0">
                    <thead>
                      <tr>
                        <th>Imagen</th>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentProducts.length > 0 ? (
                        recentProducts.map((product) => (
                          <tr key={product.id}>
                            <td>
                              <img
                                src={product.image}
                                alt={product.name}
                                className="product-image-sm"
                              />
                            </td>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>
                              <span className="badge badge-category bg-secondary">
                                {product.category}
                              </span>
                            </td>
                            <td>${product.price.toLocaleString('es-CL')}</td>
                            <td>
                              <span className={`badge ${(product.stock ?? 0) <= 5 ? 'bg-danger' : 'bg-success'}`}>
                                {product.stock ?? 'N/A'}
                              </span>
                            </td>
                            <td>
                              <Link
                                to={`/admin/products/${product.id}`}
                                className="btn btn-sm btn-primary"
                              >
                                <i className="bi bi-eye me-1"></i>
                                Ver
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="text-center">
                            No hay productos disponibles
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            {!loading && !error && products.length > 5 && (
              <div className="card-footer text-center">
                <Link to="/admin/products" className="btn btn-primary">
                  Ver Todos los Productos
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
