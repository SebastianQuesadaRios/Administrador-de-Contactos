'use client';

import { useState, useEffect } from 'react';
import { Contact } from '@/types/contact';
import ContactForm from './ContactForm';
import styles from './ContactList.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${API_URL}/contacts`);
      if (!response.ok) {
        throw new Error('Error al cargar los contactos');
      }
      const data = await response.json();
      setContacts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este contacto?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/contacts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el contacto');
      }

      await fetchContacts(); // Recargar la lista después de eliminar
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar el contacto');
    }
  };

  const handleEdit = async (contact: Contact) => {
    setSelectedContact(contact);
  };

  if (loading) return <div>Cargando contactos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.contactList}>
      <h2>Lista de Contactos</h2>
      <div className={styles.grid}>
        {contacts.map((contact) => (
          <div key={contact.id} className={styles.card}>
            <h3>{contact.name}</h3>
            <p>Email: {contact.email}</p>
            <p>Teléfono: {contact.phone}</p>
            <p className={styles.date}>
              Creado el: {new Date(contact.createdAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
            <div className={styles.actions}>
              <button 
                onClick={() => handleEdit(contact)}
                className={styles.editButton}
              >
                Editar
              </button>
              <button 
                onClick={() => handleDelete(contact.id)}
                className={styles.deleteButton}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedContact && (
        <ContactForm
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
          onSubmit={async (updatedContact: Partial<Omit<Contact, 'id'>>) => {
            try {
              const response = await fetch(`${API_URL}/contacts/${selectedContact.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedContact),
              });

              if (!response.ok) {
                throw new Error('Error al actualizar el contacto');
              }

              setSelectedContact(null);
              await fetchContacts();
            } catch (err) {
              throw new Error('Error al actualizar el contacto');
            }
          }}
        />
      )}
    </div>
  );
}