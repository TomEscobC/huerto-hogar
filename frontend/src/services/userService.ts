import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar: string;
  isAdmin: boolean;
}

/**
 * Obtiene todos los usuarios
 */
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};
