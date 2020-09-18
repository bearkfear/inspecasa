import { Provider } from './provider';
import { ModuleContext } from '@graphql-modules/core';
import { AuthContext } from '@/types';
import { Vistorias, StoreVistoria } from './types';

export const resolvers = {
  Imovel: {
    vistorias: (
      { id }: { id: number},
      _,
      { injector } : ModuleContext<AuthContext>
    ): Promise<Vistorias | undefined> => {
      return injector.get(Provider).getVistoriasFromImovel(id);
    }
  },

  Mutation: {
    storeVistoria: (
      _: any,
      { imovelId, vistoria }: StoreVistoria,
      {
        injector,
        currentUser
      }: ModuleContext<AuthContext>

    ): Promise<number | undefined> => {
      return injector.get(Provider).store(vistoria, imovelId, currentUser.id);
    }
  }

};
