import axios from 'axios';
import { Product } from '../types/product';

// URL base del API (Mockoon)
const API_URL = 'http://localhost:3001/api';

/**
 * Obtiene todos los productos desde el API
 * @returns Promise con array de productos
 */
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

/**
 * Obtiene un producto por su ID desde el API
 * @param id - ID del producto
 * @returns Promise con el producto encontrado
 */
export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await axios.get<Product>(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener producto ${id}:`, error);
    throw error;
  }
};
