import { GraphQLModule } from '@graphql-modules/core';
import { resolvers } from './resolvers';
import { Provider } from './provider';
import * as typeDefs from './schema.graphql';
import { Auth } from '../auth';

export const Cliente = new GraphQLModule({
  imports: [Auth],
  typeDefs,
  resolvers,
  providers: [Provider]
});
