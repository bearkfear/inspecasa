import types from './mutation-types';
import { IState } from './index';
interface User {
  token: string | null;
  uid: string | null;
  id: string | null;
  funcao: string | null;
  nome: string | null;
  sobrenome: string | null;
  urlImg: string | null;
}
export default {
  [types.SET_USER] (state: IState, user: User): void {
    state.user = user;
  }
};
