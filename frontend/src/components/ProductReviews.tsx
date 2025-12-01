import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Review } from '../types/product';
import { getReviewsByProduct, createReview } from '../services/reviewService';
import { useAuth } from '../context/AuthContext';

interface ProductReviewsProps {
  productId: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'danger'; text: string } | null>(null);

  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const data = await getReviewsByProduct(productId);
      setReviews(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las reseñas');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);
    setSubmitMessage(null);

    try {
      await createReview({
        productId,
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        rating: newRating,
        comment: newComment
      });

      // Agregar la reseña localmente para feedback inmediato
      const newReview: Review = {
        id: Date.now(),
        productId,
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        rating: newRating,
        comment: newComment,
        date: new Date().toISOString().split('T')[0]
      };

      setReviews([newReview, ...reviews]);
      setNewComment('');
      setNewRating(5);
      setSubmitMessage({ type: 'success', text: 'Reseña agregada exitosamente' });
    } catch (err) {
      setSubmitMessage({ type: 'danger', text: 'Error al enviar la reseña' });
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`bi ${i < rating ? 'bi-star-fill text-warning' : 'bi-star text-muted'}`}
      ></i>
    ));
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0';

  return (
    <Card className="mt-4">
      <Card.Header>
        <h4 className="mb-0">
          <i className="bi bi-chat-quote me-2"></i>
          Reseñas ({reviews.length})
          {reviews.length > 0 && (
            <span className="ms-2 text-warning">
              {renderStars(Math.round(parseFloat(averageRating)))} {averageRating}
            </span>
          )}
        </h4>
      </Card.Header>
      <Card.Body>
        {/* Formulario para nueva reseña */}
        {isAuthenticated ? (
          <Form onSubmit={handleSubmitReview} className="mb-4 p-3 bg-light rounded">
            <h5>Deja tu reseña</h5>
            {submitMessage && (
              <Alert variant={submitMessage.type} dismissible onClose={() => setSubmitMessage(null)}>
                {submitMessage.text}
              </Alert>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Calificación</Form.Label>
              <div>
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star}
                    className={`bi ${star <= newRating ? 'bi-star-fill text-warning' : 'bi-star'} fs-4 me-1`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setNewRating(star)}
                  ></i>
                ))}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Comentario</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escribe tu opinión sobre este producto..."
                required
              />
            </Form.Group>
            <Button variant="success" type="submit" disabled={submitting}>
              {submitting ? 'Enviando...' : 'Enviar Reseña'}
            </Button>
          </Form>
        ) : (
          <Alert variant="info" className="mb-4">
            <i className="bi bi-info-circle me-2"></i>
            <a href="/login">Inicia sesión</a> para dejar una reseña.
          </Alert>
        )}

        {/* Lista de reseñas */}
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : reviews.length === 0 ? (
          <p className="text-muted text-center py-3">
            No hay reseñas para este producto. ¡Sé el primero en opinar!
          </p>
        ) : (
          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review.id} className="d-flex mb-3 pb-3 border-bottom">
                <img
                  src={review.userAvatar}
                  alt={review.userName}
                  className="rounded-circle me-3"
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <strong>{review.userName}</strong>
                      <div className="text-warning">{renderStars(review.rating)}</div>
                    </div>
                    <small className="text-muted">{review.date}</small>
                  </div>
                  <p className="mb-0 mt-2">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductReviews;
