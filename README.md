# Products Wompi App

Este proyecto es una API construida con **NestJS**, que sigue los principios de **Arquitectura Hexagonal**, e implementa prácticas de desarrollo modernas como **Programación Orientada a Resultados (ROP)**, **DTOs tipados**, y **tests unitarios e integración** con cobertura.

---

## 🚀 Tecnologías

- **NestJS** (v11)
- **TypeScript**
- **TypeORM**
- **PostgreSQL** (producción)
- **SQLite** (para pruebas)
- **Swagger (OpenAPI)**
- **Jest** (testing)
- **Supertest** (tests de integración)
- **class-validator & class-transformer**
- **dotenv & ConfigModule** (manejo de entornos)

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

> Recomendado: instalar la extensión **Coverage Gutters** en VSCode para resaltar líneas no cubiertas.

---

## 📦 Docker / Despliegue

Próximamente se agregará un archivo `docker-compose.yml` para facilitar el desarrollo y despliegue en AWS ECS con PostgreSQL.

---

## 🛡 Seguridad

- Datos sensibles gestionados vía `.env` y `ConfigModule`.
- Planificado: cifrado de campos confidenciales para pagos.

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

## 📄 Scripts útiles

```bash
npm run start        # Ejecutar app en modo dev
npm run test         # Ejecutar tests
npm run test:cov     # Ejecutar tests con cobertura
npm run format       # Formatear el código
```

---

## 🧠 Notas de diseño

- `Result<T>` implementa Railway Oriented Programming (ROP) para evitar `throw` y capturar errores de dominio de forma declarativa.
- Los mapeadores transforman entre Entity <-> Domain <-> DTO.
- Se valida la cantidad máxima de direcciones por usuario vía ConfigService.

---

## ✨ Estado actual

- [x] Módulo `Users` con CRUD inicial
- [x] Swagger integrado
- [x] Pruebas de integración con SQLite
- [x] Cobertura de +88% ✅
- [ ] Módulos `Orders`, `Payments`, `Products`
- [ ] Integración con Wompi (en progreso)
- [ ] Despliegue en AWS ECS


