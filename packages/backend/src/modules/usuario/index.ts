import { GraphQLModule } from '@graphql-modules/core';
import { resolvers } from './resolvers';
import { Provider } from './provider';
import * as typeDefs from './schema.graphql';
import { Vistoria } from '../vistoria';
import { Auth } from '../auth';
import { Transacao } from '../transacao';

export const Usuario = new GraphQLModule({
  // resolversComposition,
  typeDefs,
  resolvers,
  providers: [Provider],
  imports: [
    Auth,
    Vistoria,
    Transacao
  ]
});
