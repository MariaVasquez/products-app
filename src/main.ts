import { NestFactory } from '@nestjs/core'; // ✅ ESTA ES LA LÍNEA CLAVE
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  console.log('🚀 Iniciando aplicación Nest...');
  dotenv.config();

  console.log('🔧 Variables cargadas');
  const app = await NestFactory.create(AppModule);
  console.log('✅ App Nest creada');

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: false,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Wompi FullStack API')
    .setDescription('Documentación de la API de pagos y productos')
    .setVersion('1.0')
    .addTag('Productos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 3000;
  console.log(`🟢 Escuchando en puerto ${port}`);

  await app.listen(port, '0.0.0.0');
  console.log(`✅ Aplicación corriendo en http://0.0.0.0:${port}`);
}
bootstrap();
