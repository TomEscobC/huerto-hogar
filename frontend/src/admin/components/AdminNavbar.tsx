import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Componente AdminNavbar - Barra de navegación superior del dashboard
 * Incluye botones de navegación y acciones
 */
const AdminNavbar: React.FC = () => {
  const navigate = useNavigate();

  // Función para salir del admin y volver a la tienda
  const handleExitAdmin = () => {
    navigate('/');
  };

  return (
    <nav className="admin-navbar">
      {/* Lado izquierdo - Título o Breadcrumb */}
      <div className="navbar-left">
        <h5 className="mb-0">Panel de Administración</h5>
      </div>

      {/* Lado derecho - Acciones */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={handleExitAdmin}
          >
            <i className="bi bi-box-arrow-left me-1"></i>
            Salir del Admin
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
