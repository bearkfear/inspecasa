import firebase from 'firebase/app';
import { AuthCredentials, AuthResponse } from './types';
const auth = firebase.auth();
export const resolvers = {
  Query: {
    async login (_, { email, password }:AuthCredentials): Promise<AuthResponse | undefined> {
      const resp = await auth.signInWithEmailAndPassword(email, password);
      const tokenId = await resp.user.getIdToken(true);
      return {
        token_id: tokenId
      };
    }
  }
};
