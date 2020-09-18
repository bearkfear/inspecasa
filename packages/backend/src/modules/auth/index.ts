import { GraphQLModule } from '@graphql-modules/core';
import CONSTANTS from '@/constants';
import { Session, CurrentUser } from '@/types';
import * as typeDefs from './schema.graphql';
import { resolvers } from './resolvers';
import { loadUserByToken } from '@/utils/loadUserByToken';

export const Auth = new GraphQLModule({
  name: 'auth-module',
  typeDefs,
  resolvers,
  async context ({ req }: Session) {
    let currentUser: CurrentUser = null;
    let token: string | null = null;
    if (req.headers) {
      token = String(req.headers[CONSTANTS.AUTH_HEADER]);
      if (token) {
        currentUser = await loadUserByToken(token);
      }
    }

    return {
      currentUser,
      token
    };
  }
});
