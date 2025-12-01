// Interfaz para definir la estructura de un Producto
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock?: number;
}

// Interfaz para las reseñas
export interface Review {
  id: number;
  productId: string;
  userId: number;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}
