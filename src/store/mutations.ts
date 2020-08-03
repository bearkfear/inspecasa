import types from './mutation-types';
import { IState, IUser } from './index';
export default {
  [types.SET_USER] (state: IState, user: IUser): void {
    state.user = user;
  },
  [types.SET_AUTHORIZATION](state: IState, authorization: boolean) { 
    state.authorized = authorization;
  }
};
