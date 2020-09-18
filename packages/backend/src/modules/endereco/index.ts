import { GraphQLModule } from '@graphql-modules/core';
import { resolvers } from './resolvers';
import { Provider } from './provider';
import * as typeDefs from './schema.graphql';
import { Cliente } from '../cliente';
import { Imovel } from '../imovel';
import { Usuario } from '../usuario';
import { Auth } from '../auth';
import { resolversComposition } from '@/utils/resolverComposition';

export const Endereco = new GraphQLModule({
  // resolversComposition,
  typeDefs,
  resolvers,
  providers: [Provider],
  imports: [
    Auth,
    Cliente,
    Imovel,
    Usuario
  ]
});
