import { GraphQLModule } from '@graphql-modules/core';
import { resolvers } from './resolvers';
import { Provider } from './provider';
import { Imovel } from '../imovel';
import * as typeDefs from './schema.graphql';
import { Auth } from '../auth';
export const Vistoria = new GraphQLModule({
  // resolversComposition,
  typeDefs,
  resolvers,
  providers: [Provider],
  imports: [
    Auth,
    Imovel
  ]
});
