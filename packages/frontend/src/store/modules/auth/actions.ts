import { ActionTree } from 'vuex';
import S, { User } from './types';
import { http } from '@/configs/graphql';
import gql from 'graphql-tag';
import { auth } from 'firebase/app';
import { GET_ME } from '@/queries/user';
import getToken from '@/utils/getToken';
import mutationTypes from './mutationTypes';

const actions: ActionTree<S, {}> = {
  async verificarEmail(context, email: string) {
    const resp = await http.query({
      query: gql`
        query verificarUsuario($email: String!) {
          verificaUsuario(email: $email) {
            id
            nome
            sobrenome
            urlImg
          }
        }
      `,
      variables: {
        email,
      },
    });
    return resp.data;
  },
  async logarUsuario(context, { email, password }) {
    try {
      if (!password) {
        throw {
          code: 'auth/senha-curta',
        };
      }
      const authResp = await auth().signInWithEmailAndPassword(email, password);
      const token = await authResp.user?.getIdToken(true);

      if (!token) {
        throw 'erro';
      }

      localStorage.setItem('token', token);

      const user = (await http.query<{ me: Partial<User> }>({ query: GET_ME }))
        .data.me;
      context.commit(mutationTypes.SET_USER, {
        token,
        ...user,
      });

      return {
        success: true,
      };
    } catch (e) {
      await auth().signOut();
      localStorage.removeItem('token');
      if (e.code) {
        switch (e.code) {
          case 'auth/wrong-password': {
            return {
              success: false,
              location: 'password',
              message: 'Senha incorreta',
            };
          }
          case 'auth/senha-curta': {
            return {
              success: false,
              location: 'password',
              message: 'Senha invalida',
            };
          }
          case 'auth/too-many-requests': {
            return {
              success: false,
              location: 'password',
              message: 'Muitas tentativas incorretas, tente mais tarde',
            };
          }
        }
      }
      return {
        success: false,
        location: 'password',
        message: 'Ocorreu um erro, tente mais tarde',
      };
    }
  },
};

export default actions;
