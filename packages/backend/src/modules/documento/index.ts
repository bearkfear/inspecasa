import { resolvers } from './resolvers';
import { Provider } from './provider';
import { GraphQLModule } from '@graphql-modules/core';
import * as typeDefs from './schema.graphql';

import { Imovel } from '../imovel';
import { Auth } from '../auth';

export const Documento = new GraphQLModule({
  typeDefs,
  resolvers,
  providers: [Provider],
  imports: [
    Auth,
    Imovel
  ]
});
