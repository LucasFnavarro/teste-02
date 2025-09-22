# Escola do Chavito

API REST para gerenciamento escolar desenvolvida com Fastify e Prisma.

## Como executar o projeto

### Pré-requisitos

- [Git](https://git-scm.com/) instalado
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados

### Passo a passo

1. **Clone o repositório**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd escola-do-chavito
   ```

2. **Execute com Docker Compose**
   ```bash
   docker-compose up -d
   ```

   Este comando irá:
   - Criar e configurar o banco PostgreSQL na porta 5432
   - Instalar as depend�ncias da aplica��o
   - Executar as migrations do Prisma
   - Iniciar a API na porta 3000

3. **Verificar se está funcionando**

   A API vai estar disponível em: `http://localhost:3000`

   O banco PostgreSQL vai estar acessível em: `localhost:5432`
   - Usuário: `postgres`
   - Senha: `admin`
   - Database: `escola_do_chavito`

### Para parar os serviços

```bash
docker-compose down
```

###  Para reconstruir e executar (após mudanças no código)

```bash
docker-compose down
docker-compose up --build -d
```

### Logs

Para visualizar os logs da aplica��o:
```bash
docker-compose logs -f app
```

Para visualizar os logs do banco:
```bash
docker-compose logs -f db
```

##  Estrutura do projeto

- **Fastify**: Framework web para Node.js
- **Prisma**: ORM para TypeScript/JavaScript
- **PostgreSQL**: Banco de dados
- **Docker**: Containeriza��o