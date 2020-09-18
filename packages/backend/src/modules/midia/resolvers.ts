import { Provider } from './provider';
import { ModuleContext } from '@graphql-modules/core';

export const resolvers = {
  Imovel: {
    midias: (
      { id },
      args,
      { injector }: ModuleContext
    ) => {
      return injector.get(Provider).getMidiasFromImovel(id);
    }
  },
  Query: {
    midia: (
      _: any,
      { id },
      { injector }: ModuleContext
    ) => injector.get(Provider).show(id),
    midias: (
      root,
      args,
      { injector }: ModuleContext
    ) => injector.get(Provider).list()
  },
  Mutation: {
    deleteMidia: (
      _: any,
      { id },
      { injector }: ModuleContext
    ) => injector.get(Provider).delete(id),
    updateMidia: (
      _: any,
      { id, midia },
      { injector }: ModuleContext
    ) => {
      midia.id = id;
      return injector.get(Provider).update(midia);
    },
    storeMidia: (
      _: any,
      { midia, imovelId },
      { injector }: ModuleContext
    ) => {
      return injector.get(Provider).store(midia, imovelId);
    }
  },
  Vistoria: {
    midias: (
      { id },
      args,
      { injector }: ModuleContext
    ) => injector.get(Provider).getMidiasFromVistoria(id)
  }
};
