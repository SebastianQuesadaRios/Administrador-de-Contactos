import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  // Prefijo global para las rutas
  app.setGlobalPrefix('api');
  
  // Habilitar validación global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Elimina propiedades no decoradas
    forbidNonWhitelisted: true, // Lanza error si hay propiedades no decoradas
    transform: true, // Transforma los datos al tipo especificado
  }));

  await app.listen(3001);
  console.log(`Application is running on: http://localhost:3001/api`);
}
bootstrap();
