# Backend - NestJS + TypeScript ⚙️

Este proyecto representa una API backend robusta y escalable construida con **NestJS** y **TypeScript**, aplicando principios avanzados de diseño de software como **DDD**, **arquitectura hexagonal**, y el patrón **CQRS (Command Query Responsibility Segregation)**.

La API se comunica con una base de datos PostgreSQL en **Amazon RDS** y utiliza **Amazon S3** para el almacenamiento de archivos, como imágenes de productos. Los pagos están integrados mediante **Wompi** en entorno sandbox.

---

## 🧱 Arquitectura y patrones

### 🧩 Hexagonal Architecture
- Divide la app en tres capas: **Core Domain**, **Application**, y **Infrastructure**.
- Permite cambiar adaptadores externos sin afectar la lógica del dominio.

### 🧠 Domain-Driven Design (DDD)
- Modelado del negocio a través de entidades, agregados, value objects y servicios de dominio.
- Separación clara entre **Domain Models**, **DTOs**, y **Infrastructure Entities**.

### 🔄 CQRS
- **Commands** para mutaciones (crear pedido, actualizar estado, etc).
- **Queries** para lectura eficiente y desacoplada.

### 🏭 Factory + Mapper
- **Factories** para crear instancias del dominio desde DTOs o persistencia.
- **Mappers** para convertir entre dominio y entidades persistidas con TypeORM.

---

## 🧪 Tecnologías utilizadas

- **NestJS** + **TypeScript**
- **PostgreSQL** (AWS RDS)
- **Amazon S3** (almacenamiento de imágenes)
- **TypeORM**
- **Class-validator** y **class-transformer**
- **Swagger** para documentación automática
- **Jest** para testing
- **Wompi** como proveedor de pagos

---

## 🧱 Estructura basada en Arquitectura Hexagonal

```
├── src/
│   ├── users/
│   │   ├── domain/
│   │   ├── application/
│   │   ├── infrastructure/
│   │   └── interfaces/
│   ├── shared/
│   └── config/
```

- **Domain**: entidades, repositorios y lógica pura
- **Application**: casos de uso y mapeadores
- **Infrastructure**: implementación concreta de repositorios y entidades ORM
- **Interfaces**: controladores y DTOs
```

---

## 🧾 Variables de entorno

Crea un archivo `.env` en la raíz con:

```env
# DB
DB_HOST=wompi.cgpa24aeemp2.us-east-1.rds.amazonaws.com
DB_PORT=5432
DB_NAME=wompi
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña

# AWS S3
AWS_ACCESS_KEY_ID=tu_access_key_id
AWS_SECRET_ACCESS_KEY=tu_secret_access_key
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=products-wompi-dev

# Wompi
WOMPI_PUBLIC_KEY=pk_test_xxx
WOMPI_PRIVATE_KEY=pr_test_xxx
WOMPI_INTEGRITY_SECRET=sha256_xxx
WOMPI_API_URL=https://api-sandbox.co.uat.wompi.dev/v1
```

---

## 🚀 Scripts

```bash
npm install         # Instala dependencias
npm run start:dev   # Ejecuta en modo desarrollo
npm run build       # Compila el proyecto
npm run start:prod  # Ejecuta el build
```

---

## ✅ Funcionalidades principales

- Gestión de clientes,productos, pedidos, imágenes y transacciones.
- Subida de archivos a S3 y generación de URL públicas.
- Flujo de pago con tokenización mediante Wompi.
- Aplicación desacoplada por capas y siguiendo principios SOLID.
- Endpoints documentados con Swagger.

---

## 🐳 Dockerización

El backend está completamente dockerizado para facilitar su despliegue local y en la nube. Se puede construir y ejecutar el contenedor con:

```bash
docker build -t nestjs-api .
docker run -p 5001:5001 --env-file .env nestjs-api
```

También se puede usar `docker-compose` con la base de datos y otras dependencias:

```bash
docker-compose up --build
```

---

---

## 🧪 Testing

- **Unitarios**: lógica de casos de uso y utilidades
- **Integración**: controladores con conexión a base de datos en memoria

Ejecutar cobertura:
```bash
npm run test:cov
```

Ver resultados en navegador:
```bash
coverage/lcov-report/index.html
```

---

## 🧭 Documentación API

- Disponible en: `http://localhost:5001/api/docs`
- Generado con `@nestjs/swagger`

---

## 📦 Colección Postman

Una colección Postman está disponible para facilitar el testeo de los endpoints principales del módulo **Users**.

📁 [Descargar Products-Wompi.postman_collection.json](./docs/Products-Wompi.postman_collection.json)

> Puedes importarla directamente en Postman con la opción **“Import” → “Archivo”**.

Incluye:
- **POST /api/users** → creación de usuario con dirección
- **GET /api/users/:id** → consulta de usuario por ID

---

## 🧠 Notas de diseño

- `Result<T>` implementa Railway Oriented Programming (ROP) para evitar `throw` y capturar errores de dominio de forma declarativa.
- Los mapeadores transforman entre Entity <-> Domain <-> DTO.
- Se valida la cantidad máxima de direcciones por usuario vía ConfigService.

---

## 📄 Licencia

MIT
