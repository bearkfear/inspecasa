import { Pessoa } from '@/database/types/pessoa';
import { Transacao } from '@/database/types/transacao';
import { AuthContext } from '@/types';
import { ModuleContext } from '@graphql-modules/core';
import { Provider } from './provider';

function vendas (usuario: Pessoa, args, context: ModuleContext<AuthContext>, info): Promise<Transacao[]> {
  return context.injector.get(Provider).getTransacoesFromUsuario(usuario.id);
}

const Usuario = {
  vendas
};

export const resolvers = {
  Usuario
};
