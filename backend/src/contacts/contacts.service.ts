import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  // Crear nuevo contacto
  async create(createContactDto: CreateContactDto) {
    // Verificar si ya existe un contacto con ese email
    const existingContact = await this.contactRepository.findOne({
      where: { email: createContactDto.email },
    });

    if (existingContact) {
      throw new ConflictException('Ya existe un contacto con ese email');
    }

    const contact = this.contactRepository.create(createContactDto);
    return this.contactRepository.save(contact);
  }

  // Obtener todos los contactos
  findAll() {
    return this.contactRepository.find();
  }

  // Actualizar un contacto
  async update(id: number, updateContactDto: UpdateContactDto) {
    const contact = await this.contactRepository.findOne({ where: { id } });
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    Object.assign(contact, updateContactDto);
    return this.contactRepository.save(contact);
  }

  // Eliminar un contacto
  async remove(id: number) {
    const contact = await this.contactRepository.findOne({ where: { id } });
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    return this.contactRepository.remove(contact);
  }
}
