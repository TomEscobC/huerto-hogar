import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProducts } from '../../services/productService';
import { Product } from '../../types/product';

/**
 * Componente ProductList - Lista de todos los productos (REQUISITO 1)
 * Permite filtrar productos por categoría y búsqueda
 */
const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { userId } = useParams<{ userId: string }>();
  const basePath = `/admin/user/${userId}`;

  // Cargar productos al montar el componente
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los productos. Asegúrate de que Mockoon esté ejecutándose.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Aplicar filtros cuando cambien los criterios de búsqueda
  useEffect(() => {
    let result = products;

    // Filtrar por categoría
    if (selectedCategory !== 'todos') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Filtrar por término de búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product =>
        product.name.toLowerCase().includes(term) ||
        product.id.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
      );
    }

    setFilteredProducts(result);
  }, [selectedCategory, searchTerm, products]);

  // Limpiar filtros
  const handleClearFilters = () => {
    setSelectedCategory('todos');
    setSearchTerm('');
  };

  // Obtener categorías únicas
  const categories = Array.from(new Set(products.map(p => p.category)));

  // Truncar descripción
  const truncateText = (text: string, maxLength: number = 60): string => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="container-fluid">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb admin-breadcrumb">
          <li className="breadcrumb-item">
            <Link to={basePath}>Dashboard</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Productos
          </li>
        </ol>
      </nav>

      {/* Encabezado */}
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="h3 mb-2">Gestión de Productos</h1>
          <p className="text-muted">Lista completa de productos registrados</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card admin-card">
            <div className="card-header admin-card-header">
              <h5 className="card-title mb-0">
                <i className="bi bi-funnel me-2"></i>
                Filtros
              </h5>
            </div>
            <div className="card-body admin-card-body">
              <div className="row align-items-end">
                <div className="col-md-4 mb-3">
                  <label htmlFor="filterCategory" className="form-label">
                    Categoría:
                  </label>
                  <select
                    id="filterCategory"
                    className="form-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="todos">Todas las Categorías</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="searchProduct" className="form-label">
                    Buscar:
                  </label>
                  <input
                    type="text"
                    id="searchProduct"
                    className="form-control"
                    placeholder="Buscar por ID, nombre o descripción..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <button
                    className="btn btn-outline-secondary w-100"
                    onClick={handleClearFilters}
                  >
                    <i className="bi bi-x-circle me-2"></i>
                    Limpiar Filtros
                  </button>
                </div>
              </div>

              {/* Contador de resultados */}
              <div className="row">
                <div className="col-12">
                  <p className="text-muted mb-0">
                    <i className="bi bi-info-circle me-2"></i>
                    Mostrando {filteredProducts.length} de {products.length} productos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de Productos */}
      <div className="row">
        <div className="col-12">
          <div className="card admin-card">
            <div className="card-header admin-card-header">
              <h5 className="card-title mb-0">
                <i className="bi bi-list-ul me-2"></i>
                Lista de Productos
              </h5>
            </div>
            <div className="card-body admin-card-body p-0">
              {loading ? (
                <div className="text-center p-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                  <p className="mt-3">Cargando productos...</p>
                </div>
              ) : error ? (
                <div className="alert alert-danger m-3" role="alert">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                  <div className="mt-2">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={loadProducts}
                    >
                      <i className="bi bi-arrow-clockwise me-1"></i>
                      Reintentar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover admin-table mb-0">
                    <thead>
                      <tr>
                        <th style={{width: '80px'}}>Imagen</th>
                        <th style={{width: '100px'}}>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th style={{width: '120px'}}>Categoría</th>
                        <th style={{width: '120px'}}>Precio</th>
                        <th style={{width: '150px'}}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                          <tr key={product.id}>
                            <td>
                              <img
                                src={product.image}
                                alt={product.name}
                                className="product-image-sm"
                              />
                            </td>
                            <td>
                              <code>{product.id}</code>
                            </td>
                            <td>
                              <strong>{product.name}</strong>
                            </td>
                            <td>
                              <span className="text-muted">
                                {truncateText(product.description)}
                              </span>
                            </td>
                            <td>
                              <span className="badge badge-category bg-secondary">
                                {product.category}
                              </span>
                            </td>
                            <td>
                              <strong className="text-success">
                                ${product.price.toLocaleString('es-CL')}
                              </strong>
                            </td>
                            <td>
                              <div className="btn-group" role="group">
                                <Link
                                  to={`${basePath}/products/${product.id}`}
                                  className="btn btn-sm btn-primary"
                                  title="Ver detalles"
                                >
                                  <i className="bi bi-eye"></i>
                                </Link>
                                <Link
                                  to={`/product/${product.id}`}
                                  className="btn btn-sm btn-success"
                                  title="Ver en la tienda"
                                  target="_blank"
                                >
                                  <i className="bi bi-shop"></i>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="text-center py-4">
                            <i className="bi bi-inbox display-4 text-muted d-block mb-2"></i>
                            <p className="text-muted">
                              No se encontraron productos que coincidan con los filtros.
                            </p>
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={handleClearFilters}
                            >
                              Limpiar Filtros
                            </button>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
