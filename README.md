Administrador de Contactos

Este proyecto es una aplicación web para gestionar contactos, desarrollada con NestJS (backend) y Next.js (frontend), usando MySQL como base de datos. Se proporciona un entorno dockerizado para facilitar su despliegue y ejecución.

Tecnologías Utilizadas

Backend: NestJS

Frontend: Next.js

Base de Datos: MySQL

Contenedores: Docker y Docker Compose

Instalación y Ejecución

## 1. Clonar el Repositorio

git clone https://github.com/SebastianQuesadaRios/Administrador-de-Contactos.git
cd administrador-contactos

## 2. Usar Docker (Recomendado)


Si tienes docker-compose instalado, puedes ejecutar la aplicación con un solo comando:

docker-compose up --build

Esto iniciará los contenedores para la base de datos, el backend y el frontend.

### Requisitos Previos
| Componente | Versión | Configuración |
|------------|---------|---------------|
| MySQL | 8.0 | Host: localhost |
| | | Puerto: 3306 |
| | | Usuario: root |
| | | Contraseña: root |
| | | Base de datos: contacts_db |

> **Nota**: Asegúrate de tener una instancia de MySQL en ejecución con la configuración correcta antes de iniciar el backend.

## 3. Instalación Manual (Sin Docker)

Si prefieres ejecutarlo sin Docker, sigue estos pasos:


### Backend

    cd backend

    npm install

    npm start:dev




### Frontend

    cd frontend

    npm install

    npm run dev

Asegúrate de tener una instancia de MySQL en ejecución con la configuración correcta.

## Endpoints del Backend

### Endpoints de Contactos

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/contacts` | Crear un nuevo contacto |
| GET | `/api/contacts` | Listar todos los contactos |
| PUT | `/api/contacts/:id` | Editar un contacto existente |
| DELETE | `/api/contacts/:id` | Eliminar un contacto |

### Estructura de Datos

#### Crear Contacto (POST)
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| name | string | Sí | Nombre del contacto (2-50 caracteres) |
| email | string | Sí | Email único del contacto |
| phone | string | No | Número telefónico (10-15 caracteres) |

#### Actualizar Contacto (PUT)
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| name | string | No | Nuevo nombre del contacto |
| phone | string | No | Nuevo número telefónico |




Autor

SebastianQuesadaRios - GitHub


