# Use Node LTS (Linux)
FROM node:20

# Definir diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiar apenas package.json e package-lock.json primeiro
COPY package*.json ./

# Instalar dependências dentro do container (Linux)
RUN npm ci

# Copiar o restante do código sem trazer node_modules do host
COPY . .

# Gerar Prisma Client
RUN npx prisma generate

# Expõe a porta que o Fastify vai usar
EXPOSE 3333

# Comando será definido no docker-compose.yml
