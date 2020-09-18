import { isAuthenticated } from './isAuthenticated';

export const resolversComposition = {
  'Mutation.*': [isAuthenticated()],
  'Query.clientes': [isAuthenticated()],
  'Query.cliente': [isAuthenticated()],
  'Query.imoveis': [isAuthenticated()],
  'Query.imovel': [isAuthenticated()],
  'Query.documentos': [isAuthenticated()],
  'Query.documento': [isAuthenticated()],
  'Query.vistorias': [isAuthenticated()],
  'Query.vistoria': [isAuthenticated()],
  'Query.usuarios': [isAuthenticated()],
  'Query.usuario': [isAuthenticated()],
  'Query.me': [isAuthenticated()],
  'Query.enderecos': [isAuthenticated()],
  'Query.endereco': [isAuthenticated()],
  'Query.midias': [isAuthenticated()],
  'Query.midia': [isAuthenticated()]
};
