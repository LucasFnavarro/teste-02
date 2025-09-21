# Use Node LTS
FROM node:20

# Criar diretório da app
WORKDIR /usr/src/app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Rodar comando do Prisma para gerar client
RUN npx prisma generate

# Expor porta que o Fastify vai usar
EXPOSE 3000

# Rodar a aplicação
CMD ["node", "src/index.js"]
