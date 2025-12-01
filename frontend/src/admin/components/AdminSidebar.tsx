import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Componente AdminSidebar - Barra lateral del dashboard
 * Muestra el menú de navegación del administrador
 */
const AdminSidebar: React.FC = () => {
  const location = useLocation();

  // Función para determinar si un enlace está activo
  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <aside className="admin-sidebar">
      {/* Brand */}
      <Link to="/admin" className="brand-link">
        <span className="brand-text">Huerto Hogar Admin</span>
      </Link>

      {/* Menú de navegación */}
      <nav className="mt-2">
        <ul className="nav flex-column">
          {/* Dashboard */}
          <li className="nav-item">
            <Link
              to="/admin"
              className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
            >
              <i className="bi bi-speedometer2 nav-icon"></i>
              <span>Dashboard</span>
            </Link>
          </li>

          {/* Productos */}
          <li className="nav-item">
            <Link
              to="/admin/products"
              className={`nav-link ${isActive('/admin/products') ? 'active' : ''}`}
            >
              <i className="bi bi-box-seam nav-icon"></i>
              <span>Productos</span>
            </Link>
          </li>

          {/* Separador */}
          <li className="nav-item">
            <hr className="my-2" style={{borderColor: '#4b545c'}} />
          </li>

          {/* Volver a la Tienda */}
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <i className="bi bi-shop nav-icon"></i>
              <span>Volver a la Tienda</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
