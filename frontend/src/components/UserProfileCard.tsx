import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Card } from 'react-bootstrap';
import { useAuth, User } from '../context/AuthContext';

interface UserProfile extends User {
  phone?: string;
  address?: string;
  about?: string;
  createdAt?: string;
}

const UserProfileCard: React.FC = () => {
  const { user, updateUserProfile } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    address: '',
    about: ''
  });

  useEffect(() => {
    if (user) {
      const savedProfile = localStorage.getItem(`userProfile_${user.id}`);
      const additionalData = savedProfile ? JSON.parse(savedProfile) : {};

      setProfile({
        ...user,
        phone: additionalData.phone || '+56 9 1234 5678',
        address: additionalData.address || 'Santiago, Chile',
        about: additionalData.about || 'Miembro del equipo de HuertoHogar.',
        createdAt: additionalData.createdAt || '2024-01-15'
      });
    }
  }, [user]);

  const handleOpenModal = () => {
    if (profile) {
      setEditForm({
        name: profile.name,
        phone: profile.phone || '',
        address: profile.address || '',
        about: profile.about || ''
      });
      setShowModal(true);
    }
  };

  const handleSave = () => {
    if (user && profile) {
      const updatedProfile = {
        ...profile,
        name: editForm.name,
        phone: editForm.phone,
        address: editForm.address,
        about: editForm.about
      };

      localStorage.setItem(`userProfile_${user.id}`, JSON.stringify({
        phone: editForm.phone,
        address: editForm.address,
        about: editForm.about,
        createdAt: profile.createdAt
      }));

      if (editForm.name !== user.name) {
        updateUserProfile({ name: editForm.name });
      }

      setProfile(updatedProfile);
      setShowModal(false);
    }
  };

  if (!profile) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-CL', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <>
      <Card className="admin-card mb-4">
        <Card.Header className="admin-card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <i className="bi bi-person-circle me-2"></i>
            Mi Perfil
          </h5>
          <Button variant="outline-primary" size="sm" onClick={handleOpenModal}>
            <i className="bi bi-pencil me-1"></i>
            Editar
          </Button>
        </Card.Header>
        <Card.Body>
          <div className="d-flex align-items-start">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="rounded-circle me-3"
              style={{ width: '80px', height: '80px', objectFit: 'cover' }}
            />
            <div className="flex-grow-1">
              <h5 className="mb-1">{profile.name}</h5>
              <p className="text-muted mb-2">{profile.role}</p>
              {profile.isAdmin && (
                <span className="badge bg-success me-2">
                  <i className="bi bi-shield-check me-1"></i>Admin
                </span>
              )}
            </div>
          </div>

          <hr />

          <div className="row g-3">
            <div className="col-md-6">
              <div className="d-flex align-items-center text-muted">
                <i className="bi bi-envelope me-2"></i>
                <small>{profile.email}</small>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center text-muted">
                <i className="bi bi-telephone me-2"></i>
                <small>{profile.phone}</small>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center text-muted">
                <i className="bi bi-geo-alt me-2"></i>
                <small>{profile.address}</small>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center text-muted">
                <i className="bi bi-calendar me-2"></i>
                <small>Desde {formatDate(profile.createdAt || '')}</small>
              </div>
            </div>
            <div className="col-12">
              <div className="d-flex align-items-start text-muted">
                <i className="bi bi-info-circle me-2 mt-1"></i>
                <small>{profile.about}</small>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Modal de Edición */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="tel"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ubicación</Form.Label>
              <Form.Control
                type="text"
                value={editForm.address}
                onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Acerca de mí</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={editForm.about}
                onChange={(e) => setEditForm({ ...editForm, about: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserProfileCard;
