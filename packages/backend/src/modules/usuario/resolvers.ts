import { Provider } from './provider';
import { ModuleContext } from '@graphql-modules/core';
import { AuthContext, CurrentUser } from '@/types';
import { Pessoa } from '@/database/types/pessoa';
export const resolvers = {
  Vistoria: {
    responsavel: ({ fk_pessoa_id }, args, { injector }) => {
      return injector.get(Provider).getUserById(fk_pessoa_id);
    }
  },
  Query: {
    verificaUsuario: (root, { email }: { email: string}, { injector }: ModuleContext) => {
      return injector.get(Provider).verificaUsuario(email);
    },
    usuarios: (root, args, { injector }, extra) => {
      console.log(JSON.stringify(extra.fieldNodes, null, 2));
      return injector.get(Provider).list().then(pessoas => pessoas);
    },
    usuario: (_, { id }, { injector }) => {
      return injector.get(Provider).show(id).then(pessoa => pessoa);
    },
    me: async (
      _: any,
      __: any,
      { currentUser, injector }: ModuleContext<AuthContext>
    ): Promise<CurrentUser> => {
      await injector.get(Provider).updateLastAccess(currentUser.id);
      return currentUser;
    }
  },
  Mutation: {
    updateUsuario: (
      _: any,
      { id, usuario },
      { injector }: ModuleContext<AuthContext>
    ): Promise<any> => {
      return injector.get(Provider).update({ ...usuario, id });
    },
    storeUsuario: (
      _: any,
      { usuario, password },
      { injector }: ModuleContext<AuthContext>
    ): Promise<Pessoa> => {
      return injector.get(Provider).store(usuario, password);
    },
    deleteUsuario (_, { id }, { injector }:ModuleContext) {
      return injector.get(Provider).delete(id);
    }
  }

};
