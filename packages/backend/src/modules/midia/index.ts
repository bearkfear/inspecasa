import { GraphQLModule } from '@graphql-modules/core';
import { resolvers } from './resolvers';
import { Provider } from './provider';
import * as typeDefs from './schema.graphql';
import { Imovel } from '../imovel';
import { Vistoria } from '../vistoria';
import { Auth } from '../auth';
import { resolversComposition } from '@/utils/resolverComposition';

export const Midia = new GraphQLModule({
  // resolversComposition,
  typeDefs,
  resolvers,
  providers: [Provider],
  imports: [
    Auth,
    Imovel,
    Vistoria
  ]
});
