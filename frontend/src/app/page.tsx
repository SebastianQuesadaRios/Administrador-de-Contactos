'use client';

import { useState } from 'react';
import ContactList from '@/components/ContactList';
import ContactForm from '@/components/ContactForm';
import styles from './page.module.css';

// URL base para las peticiones a la API
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function Home() {
  // Estado para mostrar mensajes de éxito/error
  const [message, setMessage] = useState<string | null>(null);
  // Estado para forzar la actualización de la lista de contactos
  const [listKey, setListKey] = useState(0);

  // Función para mostrar mensajes temporales
  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Directorio de Contactos</h1>
      
      {/* Mensaje de éxito/error */}
      {message && (
        <div className={styles.successMessage}>
          {message}
        </div>
      )}
      
      <div className={styles.grid}>
        {/* Formulario para crear nuevos contactos */}
        <div className={styles.formSection}>
          <ContactForm 
            onSubmit={async (contact) => {
              const response = await fetch(`${API_URL}/contacts`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(contact),
              });
              
              if (!response.ok) {
                throw new Error('Error al crear el contacto');
              }

              showMessage('Contacto creado satisfactoriamente');
              setListKey(prev => prev + 1); // Actualiza la lista
            }}
          />
        </div>
        
        {/* Lista de contactos */}
        <div className={styles.listSection}>
          <ContactList key={listKey} />
        </div>
      </div>
    </div>
  );
}
