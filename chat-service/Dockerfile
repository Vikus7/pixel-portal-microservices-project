FROM node:18

WORKDIR /usr/src/app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer puerto
EXPOSE 3001

# Comando para iniciar
CMD [ "npm", "run", "start:prod" ]