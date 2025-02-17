# Infinity Base Chat Platform

![GitHub](https://img.shields.io/github/erikwtg/chat-platform)
![Docker](https://img.shields.io/badge/Docker-✓-blue)
![Node.js](https://img.shields.io/badge/Node.js-✓-green)
![NestJS](https://img.shields.io/badge/NestJS-✓-green)
![TypeScript](https://img.shields.io/badge/TypeScript-✓-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-✓-blue)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-✓-orange)
![Next.js](https://img.shields.io/badge/Next.js-✓-green)

**Chat Platform**

## O projeto foi feito com a estrutura em containers Docker e é estruturado como um monorepo. Este projeto inclui vários serviços interconectados, como uma API, banco de dados, fila de mensagens e um frontend. Abaixo estão as instruções para configurar e rodar o ambiente de desenvolvimento.

## Tecnologias Utilizadas

- **Node.js** e **Nest.js** e **TypeScript** para o desenvolvimento da API.
- **PostgreSQL** como banco de dados.
- **RabbitMQ** para gerenciamento de filas de mensagens.
- **Next.js** no frontend (WebApp).
- **Docker** e **Docker Compose** para facilitar a execução de todos os serviços em containers.
- **Monorepo** para organizar múltiplos serviços no mesmo repositório.

## Estrutura do Projeto

O projeto segue uma estrutura de monorepo, com cada serviço dentro de uma pasta separada. Abaixo está a lista de serviços incluídos:

- **api**: API backend utilizando Node.js, TypeScript, Design Patterns (Template Method, SOLID, Factory Functions).
- **webapp**: Frontend da aplicação.

## Requisitos

- **Docker** (com Docker Compose) instalado.
- **Node.js**

## Instalação e Execução

### 1. Clonar o Repositório

Primeiro, clone este repositório para sua máquina local:

```bash
git clone https://github.com/erikwtg/chat-platform.git
cd chat-platform
```

### 2. Construção e Execução em Modo Desenvolvimento

O projeto já possui um arquivo docker-compose.yml configurado para orquestrar os serviços.

### 3. Build e Start dos Containers

Para rodar os serviços em modo desenvolvimento, execute o seguinte comando:

```bash
./deployment.sh
```

ou

```bash
docker network create chat_platform_network

docker-compose -f docker-compose.yml up -d --build
```

Esse comando irá:
Criar a rede chat_platform_network.

Construir os containers necessários.

Rodar os serviços na porta configuradas no docker-compose.yml.

Criar o banco de dados PostgreSQL.

Inicializar os serviços RabbitMQ e o consumo das filas.

### DESIGN PATTERNS E ARQUITETURA

- **Template Method**: Utilizado para definir o esqueleto de algoritmos, permitindo que subclasses forneçam implementações específicas.
- **SOLID**: O código foi estruturado com base nos princípios SOLID para garantir maior coesão e baixa acoplabilidade.
- **Factory Functions**: Para a criação de objetos, melhorando a extensibilidade do código.

## Acesso às Aplicações

Depois de executar o comando de inicialização, você pode acessar as aplicações através dos seguintes endereços:

- **WebApp**: http://localhost:3002
- **API**: http://server:3000
- **RabbitMQ**: http://rabbitmq:15672
- **PostgreSQL**: http://postgres:5432

## Funcionalidades Implementadas

- Cadastro de usuário.
- Login de usuário.
- Listagem de salas.
- Criação de salas.
- Entrada em uma sala.
- Envio de mensagens.
- Recebimento de mensagens.
- Edição de mensagens.
- Exclusão de mensagens.

## Melhorias (Coisas que gostaria de ter feito)

Embora o projeto tenha sido desenvolvido com as melhores práticas disponíveis dentro do tempo e dos requisitos do desafio, há algumas melhorias que gostaria de ter implementado:

1. Abstração dos Controllers: A arquitetura do código poderia ser melhorada ao abstrair os controllers de maneira mais eficaz, separando melhor as responsabilidades e tornando o código mais modular e fácil de manter.
2. Testes Unitários: Gostaria de implementar testes para melhorar a cobertura e a confiança na estabilidade do sistema.
3. Observabilidade: A inclusão de logs e métricas mais detalhadas ajudaria a entender melhor o comportamento da aplicação.
4. Tratamento de Erros e Validações no Frontend: Embora o tratamento de erros no backend tenha sido abordado, a validação e o tratamento de erros no frontend podem ser aprimorados. Gostaria de ter implementado uma validação de dados mais robusta e um sistema de feedback mais amigável para o usuário final.
5. Documentação da API
6. Validação nos dados de entrada dos formulários com Zod
7. Melhorar lógica de contexto e websocket
8. Quebrar os componentes em mais componentes desacoplando para separar ainda melhor a lógica do componente
9. Tratar mensagens complexas de midias
10. Utilizar Zustand ou  para trabalhar com estado de forma mais consistente e nao utilizar localstorage para dados do usuário
11. Implementar cache de memória em redis para os usuários conectados as sala
12. Finalizar implementacao no service de mensagem para gravar mensagem antes da edição no histórico

## Problemas Encontrados

1. Banco de dados caso não seja criado corretamente, pode ser necessário criar o banco de dados manualmente.
Acesse o container da API server e execute o seguinte comando:

```bash
npx drizzle-kit migrate
```

Caso ainda persistisse o problema, apague todo conteúdo da pasta server/drizzle, acesse o container da API server e execute o seguintes comandos:

```bash
npx drizzle-kit generate

npx drizzle-kit migrate
```

## Tecnologias e Estruturas Utilizadas

A escolha das tecnologias e das estruturas foi feita com base no desafio proposto.

1. Node.js e TypeScript com NestJS: foi escolhido pela sua performance e pela familiaridade com o ecossistema JavaScript. É uma tecnologia excelente suporte para APIs assíncronas e alto desempenho em sistemas que exigem escalabilidade.

2. PostgreSQL: foi escolhido por ser uma base de dados relacional, garantindo a consistência e a integridade dos dados.

3. RabbitMQ: foi escolhido para gerenciar as filas de mensagens, permitindo que o projeto seja escalável e flexível de acordo com a característica do projeto.

4. Next.js: foi escolhido para o frontend, pela sua familiaridade e pela sua performance.

6. Docker e Docker Compose: foi escolhido para facilitar a execução de todos os serviços em containers.

7. Monorepo: foi escolhido para organizar todos os serviços em um único repositório, facilitando a manutenção e o desenvolvimento.
