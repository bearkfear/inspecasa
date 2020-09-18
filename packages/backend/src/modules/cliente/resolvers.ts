
import { Provider } from './provider';
import { ModuleContext } from '@graphql-modules/core';
// import { Cliente, ClienteInput } from './types';
// import { Imovel } from '../imovel/types';
export const resolvers = {

  Imovel: {
    proprietarios: (root, __:any, { injector }: ModuleContext) => {
      return injector.get(Provider).getProprietariosImovel(root.id);
    }
  },

  Cliente: {
    id: (cliente: Cliente) => cliente.id,
    nome: (cliente: Cliente) => cliente.nome,
    sobrenome: (cliente: Cliente) => cliente.sobrenome,
    email: (cliente: Cliente) => cliente.email,
    createdAt: (cliente: Cliente) => cliente.created_at,
    changedAt: (cliente: Cliente) => cliente.changed_at,
    bio: (cliente: Cliente) => cliente.bio,
    urlImg: (cliente: Cliente) => cliente.url_img
  },
  Query: {
    clientes: (
      root: any,
      _:any,
      { injector }: ModuleContext
    ) => injector.get(Provider).list(),
    cliente: (
      _,
      { id },
      { injector }: ModuleContext
    ) => injector.get(Provider).show(id)
  },
  Mutation: {
    storeCliente: (
      _: any,
      { cliente },
      { injector }: ModuleContext
    ) => injector.get(Provider).store(cliente),
    updateCliente: (
      _: any,
      { cliente, id },
      { injector }: ModuleContext
    ) => injector.get(Provider).update({ ...cliente, id }),

    deleteCliente: (_, { id }, { injector }: ModuleContext) => {
      return injector.get(Provider).delete(id);
    }
  }
};
