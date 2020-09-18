import { Provider } from './provider';

export const resolvers = {
  Imovel: {
    documentos: (
      { id },
      _,
      { injector }
    ) => {
      return injector.get(Provider).getDocsFromImovelId(id);
    }
  },
  Query: {
    documento: (_: any,
      { id },
      { injector }
    ) => injector.get(Provider).show(id),
    documentos: (
      root,
      args,
      { injector }
    ) => injector.get(Provider).list()
  },
  Mutation: {
    deleteDocumento: (
      root: any,
      { id },
      { injector }
    ) => injector.get(Provider).delete(id),
    updateDocumento: (
      root: any,
      { id, input },
      { injector }
    ) => {
      const payload = {
        ...input,
        id
      };
      return injector.get(Provider).update(payload);
    },
    storeDocumento: (
      _: any,
      { input, imovelId },
      { injector }
    ) => injector.get(Provider).store(input, imovelId)
  }
};
