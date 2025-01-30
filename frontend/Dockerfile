FROM node:20-bullseye-slim

WORKDIR /app

# Instalar dependencias primero para aprovechar el caché
COPY package*.json ./
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Construir la aplicación
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"] 