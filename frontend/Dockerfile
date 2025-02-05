FROM node:18-alpine as development

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer puerto de Vite
EXPOSE 5173

# Comando para desarrollo
CMD ["npm", "run", "dev", "--", "--host"]

# Etapa de producción
FROM node:18-alpine as production

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Servidor de producción con nginx
FROM nginx:alpine

COPY --from=production /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
