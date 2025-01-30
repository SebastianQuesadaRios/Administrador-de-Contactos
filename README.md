Administrador de Contactos

Este proyecto es una aplicación web para gestionar contactos, desarrollada con NestJS (backend) y Next.js (frontend), usando MySQL como base de datos. Se proporciona un entorno dockerizado para facilitar su despliegue y ejecución.

Tecnologías Utilizadas

Backend: NestJS

Frontend: Next.js

Base de Datos: MySQL

Contenedores: Docker y Docker Compose

Instalación y Ejecución

1. Clonar el Repositorio

git clone https://github.com/tu-usuario/administrador-contactos.git
cd administrador-contactos

2. Usar Docker (Recomendado)

Si tienes Docker Desktop instalado, puedes ejecutar la aplicación con un solo comando:

docker-compose up --build

Esto iniciará los contenedores para la base de datos, el backend y el frontend.

Accesos:

Frontend: http://localhost:3001

Backend: http://localhost:3000

MySQL: localhost:3306 (usuario: user, contraseña: password)

3. Instalación Manual (Sin Docker)

Si prefieres ejecutarlo sin Docker, sigue estos pasos:

Backend

cd backend
npm install
npm run start

Frontend

cd frontend
npm install
npm run dev

Asegúrate de tener una instancia de MySQL en ejecución con la configuración correcta.

Endpoints del Backend

Método

Ruta

Descripción

POST

/contacts

Crear un nuevo contacto

GET

/contacts

Listar todos los contactos

PUT

/contacts/:id

Editar un contacto

DELETE

/contacts/:id

Eliminar un contacto

Estructura del Proyecto

/administrador-contactos
├── backend/      # API en NestJS
├── frontend/     # Interfaz en Next.js
├── docker-compose.yml  # Orquestación con Docker
└── README.md     # Documentación del proyecto

Mejoras Futuras

Autenticación y autorización de usuarios.

Paginación en la lista de contactos.

Implementación de pruebas unitarias.

Autor

Tu Nombre - GitHub

