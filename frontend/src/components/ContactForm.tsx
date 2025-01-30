'use client';

import { useState } from 'react';
import { Contact } from '@/types/contact';
import styles from './ContactForm.module.css';

interface ContactFormProps {
  contact?: Contact;
  onSubmit: (contact: Partial<Omit<Contact, 'id'>>) => Promise<void>;
  onClose?: () => void;
}

export default function ContactForm({ contact, onSubmit, onClose }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: contact?.name || '',
    email: contact?.email || '',
    phone: contact?.phone || ''
  });
  const [error, setError] = useState<string | null>(null);

  const validatePhone = (phone: string) => {
    // Validar que el teléfono tenga al menos 10 dígitos
    return phone.replace(/\D/g, '').length >= 10;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validar teléfono antes de enviar
    if (!validatePhone(formData.phone)) {
      setError('El número de teléfono debe tener al menos 10 dígitos');
      return;
    }

    try {
      // Si es edición, solo enviar name y phone
      const dataToSubmit = contact 
        ? { name: formData.name, phone: formData.phone }
        : formData;

      await onSubmit(dataToSubmit);
      if (!contact) {
        setFormData({ name: '', email: '', phone: '' });
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al guardar el contacto');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formHeader}>
        <h2>{contact ? 'Editar Contacto' : 'Nuevo Contacto'}</h2>
        {contact && onClose && (
          <button 
            type="button" 
            onClick={onClose}
            className={styles.closeButton}
          >
            ✕
          </button>
        )}
      </div>
      
      {error && <div className={styles.error}>{error}</div>}
      
      <div className={styles.formGroup}>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
          disabled={!!contact}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="phone">Teléfono: (mínimo 10 dígitos)</label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => {
            setFormData({...formData, phone: e.target.value});
            setError(null); // Limpiar error cuando el usuario empiece a escribir
          }}
          required
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        {contact ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
} 