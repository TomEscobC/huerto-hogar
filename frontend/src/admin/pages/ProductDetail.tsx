import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../../services/productService';
import { Product } from '../../types/product';

/**
 * Componente ProductDetail - Detalle de un producto (REQUISITO 2)
 * Muestra toda la información de un producto específico
 */
const ProductDetail: React.FC = () => {
  const { id, userId } = useParams<{ id: string; userId: string }>();
  const basePath = `/admin/user/${userId}`;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar producto al montar el componente
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
      setError('Error al cargar el producto. Asegúrate de que Mockoon esté ejecutándose.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Mapeo de categorías a colores de badges
  const getCategoryColor = (category: string | undefined): string => {
    if (!category) return 'secondary';
    const colors: { [key: string]: string } = {
      frutas: 'success',
      verduras: 'primary',
      organicos: 'warning',
      lacteos: 'info',
    };
    return colors[category] || 'secondary';
  };

  // Formatear categoría
  const formatCategory = (category: string | undefined): string => {
    if (!category) return 'Sin categoría';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  // Formatear precio
  const formatPrice = (price: number | undefined): string => {
    if (price === undefined || price === null) return '0';
    return price.toLocaleString('es-CL');
  };

  return (
    <div className="container-fluid">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb admin-breadcrumb">
          <li className="breadcrumb-item">
            <Link to={basePath}>Dashboard</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`${basePath}/products`}>Productos</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product ? product.id : id}
          </li>
        </ol>
      </nav>

      {/* Encabezado */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 mb-2">Detalle del Producto</h1>
              <p className="text-muted">Información completa del producto</p>
            </div>
            <div>
              <Link
                to={`${basePath}/products`}
                className="btn btn-outline-secondary"
              >
                <i className="bi bi-arrow-left me-2"></i>
                Volver al Listado
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      {loading ? (
        <div className="row">
          <div className="col-12">
            <div className="card admin-card">
              <div className="card-body text-center p-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-3">Cargando producto...</p>
              </div>
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="row">
          <div className="col-12">
            <div className="card admin-card">
              <div className="card-body">
                <div className="alert alert-danger" role="alert">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => id && loadProduct(id)}
                  >
                    <i className="bi bi-arrow-clockwise me-1"></i>
                    Reintentar
                  </button>
                  <Link
                    to={`${basePath}/products`}
                    className="btn btn-outline-secondary"
                  >
                    <i className="bi bi-arrow-left me-1"></i>
                    Volver al Listado
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : product ? (
        <div className="row">
          {/* Imagen del Producto */}
          <div className="col-md-4 mb-4">
            <div className="card admin-card">
              <div className="card-header admin-card-header">
                <h5 className="card-title mb-0">
                  <i className="bi bi-image me-2"></i>
                  Imagen del Producto
                </h5>
              </div>
              <div className="card-body admin-card-body text-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image-lg img-fluid"
                />
              </div>
            </div>
          </div>

          {/* Información del Producto */}
          <div className="col-md-8 mb-4">
            <div className="card admin-card">
              <div className="card-header admin-card-header">
                <h5 className="card-title mb-0">
                  <i className="bi bi-info-circle me-2"></i>
                  Información del Producto
                </h5>
              </div>
              <div className="card-body admin-card-body">
                <div className="row mb-3">
                  <div className="col-md-3">
                    <strong>ID del Producto:</strong>
                  </div>
                  <div className="col-md-9">
                    <code className="fs-6">{product.id}</code>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-3">
                    <strong>Nombre:</strong>
                  </div>
                  <div className="col-md-9">
                    <h4 className="mb-0">{product.name}</h4>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-3">
                    <strong>Descripción:</strong>
                  </div>
                  <div className="col-md-9">
                    <p className="mb-0">{product.description}</p>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-3">
                    <strong>Categoría:</strong>
                  </div>
                  <div className="col-md-9">
                    <span className={`badge bg-${getCategoryColor(product.category)} fs-6`}>
                      {formatCategory(product.category)}
                    </span>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-3">
                    <strong>Precio:</strong>
                  </div>
                  <div className="col-md-9">
                    <h3 className="mb-0 text-success">
                      ${formatPrice(product.price)}
                    </h3>
                  </div>
                </div>

                <hr />

                {/* Acciones */}
                <div className="row">
                  <div className="col-12">
                    <h5 className="mb-3">Acciones:</h5>
                    <div className="btn-group" role="group">
                      <Link
                        to={`${basePath}/products`}
                        className="btn btn-secondary"
                      >
                        <i className="bi bi-arrow-left me-2"></i>
                        Volver al Listado
                      </Link>
                      <Link
                        to={`/product/${product.id}`}
                        className="btn btn-success"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="bi bi-shop me-2"></i>
                        Ver en la Tienda
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Estadísticas adicionales (opcional) */}
          <div className="col-12">
            <div className="card admin-card">
              <div className="card-header admin-card-header">
                <h5 className="card-title mb-0">
                  <i className="bi bi-bar-chart me-2"></i>
                  Información Adicional
                </h5>
              </div>
              <div className="card-body admin-card-body">
                <div className="row">
                  <div className="col-md-4">
                    <div className="info-box">
                      <i className="bi bi-tag-fill text-primary fs-3"></i>
                      <div className="ms-3">
                        <h6 className="text-muted mb-0">SKU</h6>
                        <strong>{product.id}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="info-box">
                      <i className="bi bi-currency-dollar text-success fs-3"></i>
                      <div className="ms-3">
                        <h6 className="text-muted mb-0">Precio Unitario</h6>
                        <strong>${formatPrice(product.price)}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="info-box">
                      <i className="bi bi-folder-fill text-warning fs-3"></i>
                      <div className="ms-3">
                        <h6 className="text-muted mb-0">Categoría</h6>
                        <strong>{formatCategory(product.category)}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetail;
