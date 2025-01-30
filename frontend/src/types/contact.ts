// Define la estructura que debe tener un contacto
export interface Contact {
  id: string;    // ID único del contacto
  name: string;  // Nombre del contacto
  email: string; // Email del contacto
  phone: string; // Teléfono del contacto
  createdAt: string;  // Añadimos el campo createdAt
} 