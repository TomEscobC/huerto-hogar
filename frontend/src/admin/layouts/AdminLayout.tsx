import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminNavbar from '../components/AdminNavbar';
import AdminFooter from '../components/AdminFooter';
import '../styles/admin.css';

/**
 * Componente AdminLayout - Layout principal del dashboard
 * Estructura la página con sidebar, navbar, contenido y footer
 */
const AdminLayout: React.FC = () => {
  // Efecto para agregar clase al body cuando se monta el componente
  useEffect(() => {
    document.body.classList.add('admin-layout');

    // Limpieza al desmontar
    return () => {
      document.body.classList.remove('admin-layout');
    };
  }, []);

  return (
    <div className="admin-wrapper">
      {/* Sidebar izquierdo */}
      <AdminSidebar />

      {/* Navbar superior */}
      <AdminNavbar />

      {/* Área de contenido principal */}
      <div className="admin-content-wrapper">
        <Outlet />
      </div>

      {/* Footer */}
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;
