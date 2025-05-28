# Etapa 1: Construcción de la app
FROM node:20-alpine AS builder

# Crear directorio de trabajo
WORKDIR /app

# Copiar e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Establecer entorno de producción
ENV NODE_ENV=prod

# Compilar el proyecto NestJS
RUN npm run build

# Etapa 2: Imagen final para producción
FROM node:18-alpine

WORKDIR /app

# Copiar solo lo necesario desde el build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Establecer nuevamente NODE_ENV (por si ECS no lo pasa)
ENV NODE_ENV=prod

# Comando de inicio
CMD ["node", "dist/src/main"]