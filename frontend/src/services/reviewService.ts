import axios from 'axios';
import { Review } from '../types/product';

const API_URL = 'http://localhost:3001/api';

/**
 * Obtiene todas las reseñas
 */
export const getReviews = async (): Promise<Review[]> => {
  try {
    const response = await axios.get<Review[]>(`${API_URL}/reviews`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    throw error;
  }
};

/**
 * Obtiene las reseñas de un producto específico
 */
export const getReviewsByProduct = async (productId: string): Promise<Review[]> => {
  try {
    const allReviews = await getReviews();
    return allReviews.filter(review => review.productId === productId);
  } catch (error) {
    console.error(`Error al obtener reseñas del producto ${productId}:`, error);
    throw error;
  }
};

/**
 * Crea una nueva reseña
 */
export const createReview = async (review: Omit<Review, 'id' | 'date'>): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axios.post(`${API_URL}/reviews`, review);
    return response.data;
  } catch (error) {
    console.error('Error al crear reseña:', error);
    throw error;
  }
};
