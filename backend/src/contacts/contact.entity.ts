import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;              // ID único autoincremental

  @Column()
  name: string;           // Nombre del contacto

  @Column({ unique: true })
  email: string;          // Email único del contacto

  @Column({ nullable: true })
  phone?: string;         // Teléfono (opcional)

  @CreateDateColumn()
  createdAt: Date;        // Fecha de creación (automática)
}
