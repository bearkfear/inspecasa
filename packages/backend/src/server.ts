import 'graphql-import-node';
import 'reflect-metadata';
import '@/configs/enviroment';
import '@/configs/firebase';
import '@/configs/sentry';
import { ApolloServer } from 'apollo-server';
import { fieldResolver } from '@/utils/fieldResolver';
import AppModule from './modules';
import graphqlLogger from '@/log/plugin';
import CONST from '@/constants';

const server = new ApolloServer({
  fieldResolver,
  schema: AppModule.schema,
  context: AppModule.context,
  playground: {
    title: 'Inspecasa Backend'
  },
  tracing: true,
  plugins: [graphqlLogger],
  cors: {
    origin: ['http://localhost:8080', 'https://inspecasa.web.app']
  }
});

server.listen({
  port: CONST.PORT
}).then(({ url }) => {
  console.log('\n\n\n');
  console.log(`
  =================================================================

      🚀 RODANDO SERVIDOR EM ${CONST.ENV} NA PORTA ${CONST.PORT}  

      URL: ${url}

      ✍🏻 bearkfear - 🌍 Brasil 2020 - ✅ v1 / inspecasa@backend   

  =================================================================
`);
  console.log('\n\n\n');
});
