import React from 'react';

/**
 * Componente AdminFooter - Pie de página del dashboard
 * Muestra información de copyright y versión
 */
const AdminFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="admin-footer">
      <div className="text-center">
        <strong>Huerto Hogar Admin</strong> - Dashboard de Administración
        <div className="text-muted small">
          Copyright © {currentYear}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
