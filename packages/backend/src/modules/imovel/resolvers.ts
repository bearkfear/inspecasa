import { Provider } from './provider';
import snakeCase from 'lodash/snakeCase';
import mapKeys from 'lodash/mapKeys';
import { ModuleContext } from '@graphql-modules/core';
import { AuthContext } from '@/types';
import { Imovel } from '@/database/types/imovel';
import { Transacao } from '@/database/types/transacao';

const imoveis = (
  _: any,
  __: any,
  { injector }: ModuleContext<AuthContext>
): Promise<Imovel[]> => {
  return injector.get(Provider).list(20);
};

const imovel = (
  _: any,
  { id },
  { injector }: ModuleContext<AuthContext>
): Promise<Imovel> => {
  return injector.get(Provider).show(id);
};

const storeImovel = (
  _: any,
  { imovel, owners },
  { injector, currentUser }: ModuleContext<AuthContext>
): Promise<Imovel> => {
  const mappedKeys = mapKeys(imovel, (value, key) => {
    return snakeCase(String(key));
  });
  return injector.get(Provider).createImovel(mappedKeys, owners, currentUser.id);
};

const updateImovel = (
  _: any,
  { id, imovel },
  { injector }: ModuleContext<AuthContext>
): Promise<Imovel> => {
  const payload = {
    ...imovel,
    id
  };
  return injector.get(Provider).update(payload);
};

const deleteImovel = (
  _: any,
  { id },
  { injector }: ModuleContext<AuthContext>
) => {
  return injector.get(Provider).delete(id);
};

export const resolvers = {
  // TODO: CRIAR IMOVEIS CLIENTES, Compras, Vendas
  Cliente: {
    imoveis: () => [],
    compras: () => [],
    vendas: () => []
  },

  Transacao: {
    imovel: (transacao: Transacao, args, context: ModuleContext<AuthContext>, info) => {
      return context.injector.get(Provider).show(transacao.fk_imovel_id);
    }
  },

  Query: {
    imoveis,
    imovel
  },

  Mutation: {
    storeImovel,
    updateImovel,
    deleteImovel,
    async venderImovel (
      root,
      args,
      context: ModuleContext<AuthContext>,
      info
    ): Promise<boolean> {
      const {
        id,
        compradores,
        valorVenda,
        situacao
      } = args as {
        id: number;
        compradores: number[];
        valorVenda: number;
        situacao: number;
      };
      await context.injector.get(Provider).venderImovel(
        id,
        compradores,
        valorVenda,
        context.currentUser.id,
        situacao
      );

      return true;
    }
  }
};
