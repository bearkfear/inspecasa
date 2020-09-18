import { GraphQLModule } from '@graphql-modules/core';

import { Cliente } from './cliente';
import { Documento } from './documento';
import { Endereco } from './endereco';
import { Imovel } from './imovel';
import { Midia } from './midia';
import { Usuario } from './usuario';
import { Vistoria } from './vistoria';
import { Auth } from './auth';
import { resolversComposition } from '@/utils/resolverComposition';

export default new GraphQLModule({
  resolversComposition,
  imports: [
    Auth,
    Cliente,
    Documento,
    Endereco,
    Imovel,
    Midia,
    Usuario,
    Vistoria
  ]
});
