import { GraphQLModule } from '@graphql-modules/core';
import * as typeDefs from './schema.graphql';
import { resolvers } from './resolvers';
import { Provider } from './provider';
import { Cliente } from '../cliente';
import { Auth } from '../auth';
// import { resolversComposition } from '@/utils/resolverComposition';

export const Imovel = new GraphQLModule({
  // resolversComposition,
  typeDefs,
  resolvers,
  providers: [
    Provider
  ],
  imports: [
    Auth,
    Cliente
  ]
});
