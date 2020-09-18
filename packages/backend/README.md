


Recomendações: 

Instalar usando um gêrenciador de pacotes

-	Windows: [Chocolatey](https://chocolatey.org/docs/installation)
-	Mac OS: [Home Brew](https://brew.sh/index_pt-br) | *- precisa ter o Ruby instalado*
- Linux: APT (previamente instalado em sistemas debian)

## Inicio Rapido
Instale as dependências do projeto
```bash
yarn install # Este comando instalará todas as dependências necessárias
```

Rode para desenvolvimento:

```bash
yarn start ## Roda o sistema em desenvolvimento e fica observando alterações
```
**Rode para Produção**
```bash
yarn build ## Roda o servidor e não fica observando alterações
```
Abra o navegador na url: `http://<baseurl>:8000/playground`

Coloque a URI API: `http://<baseurl>:8000/graphql`


## API

Para testar ou fazer uso existem alguns endpoints. Presuponho que tenha a baseUrl do seu Servidor (local ou em produção)
	

#### /graphql

A url utilizada pelas aplicações (web, mobile, ...)


#### /playground

Abre página de Playground (local onde pode verificar documentações, construir Querys, alterar informações) que permite acesso direto a linguagem GraphQL

#### /subscriptions

@Beta Essa url ainda não faz nada, mas é utilizada para fazer conexões em tempo real (receber e enviar informações)


## Estrutura do projeto

```bash
root/
	tsconfig.json
	README.md
	prettierrc.json
	package.json
	LICENSE
	.gitignore
	src/
		index.ts
		types.ts
		graphql/
			index.ts
			mocks/
				index.ts
			resolvers/
				index.ts
				**.resolvers.*
			schemas/
				index.ts
				**.schemas.graphql

```

## MIGRATIONS KNEXT

Uso do TypeScript com o Knext para typechecking


Criar um *migration-file*
```bash
knex migrate:make --knexfile knexfile.ts -x ts <your-migration-name>
```
Rodar um arquivo de Migração
```bash
knex migrate:latest --knexfile knexfile.ts 
```

Gerar um arquivo de Seed
```bash
knex seed:make --knexfile knexfile.ts -x ts <your-seed-name>
```
Rodar um arquivo de Seed
```bash
knex seed:run --knexfile knexfile.ts 
```

The --knexfile knexfile.ts won't be necessary if you use knexfile.js since the typescript cannot provide any type checking for you for the config file.

## Persistência de dados

![DER](https://raw.githubusercontent.com/bearkfear/inspecasa-backend/master/DB_CONCEITUAL.png)


Postgress
// TODO: escrever mais sobre isso

## Documentos para referência de desenvolvimento

- [GraphQL Yoga](https://github.com/prisma-labs/graphql-yoga)
- [Modular Resolvers para GraphQL](https://github.com/prisma-labs/graphql-yoga/tree/master/examples/modular-resolvers)
- [Merge GraphQL Schemas](https://github.com/Urigo/merge-graphql-schemas)
- [Schemas](https://graphql.org/learn/schema/)
- [cors](https://github.com/expressjs/cors#configuration-options)
- [VueJS FullStack Example](https://github.com/prisma-labs/graphql-yoga/tree/master/examples/fullstack-vue)
- [TS Node](https://www.npmjs.com/package/ts-node) Para build
- [TS Node Dev](https://www.npmjs.com/package/ts-node-dev) Para Desenvolvimento
