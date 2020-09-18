import { Provider } from './provider';
import { ModuleContext } from '@graphql-modules/core';

export const resolvers = {
  Query: {
    endereco: (_: any, { id }, { injector }) => injector.get(Provider).show(id),
    enderecos: (root, args, { injector }) => injector.get(Provider).list()
  },
  Mutation: {
    deleteEndereco: (_: any, { id }, { injector }) => injector.get(Provider).delete(id),
    updateEndereco: (_: any, { id, input, imovelId }, { injector }) => {
      const payload = {
        ...input,
        id,
        fk_imovel_id: imovelId
      };
      return injector.get(Provider).update(payload);
    },
    storeEndereco: (_: any, { input }, { injector }) => injector.get(Provider).store(input)
  },
  Imovel: {
    endereco: (
      { id },
      _: any,
      { injector }: ModuleContext
    ) => {
      return injector.get(Provider).getEnderecoFromImovel(id);
    }
  },
  Usuario: {
    enderecos: ({ id }, args, { injector }) => {
      return injector.get(Provider).getEnderecosFromUser(id);
    }
  }
};
