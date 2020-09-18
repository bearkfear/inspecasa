import { Injectable } from '@graphql-modules/di';
import { Vistoria } from '@/database/types/vistoria';
import { Provider as MidiaProvider } from '../midia/provider';
import { VistoriaInput } from './types';
import db from '@/database';
import getLogger from '@/log';

const logger = getLogger('VISTORIA');
logger.level = 'debug';

@Injectable()
export class Provider {
  async getVistoriasFromImovel (idImovel: number): Promise<Vistoria[] | undefined> {
    const vistorias = await db<Vistoria>('vistoria').orderBy('id', 'desc')
      .where({ fk_imovel_id: idImovel });

    return vistorias || [];
  }

  async store (vistoria: VistoriaInput, imovelId: number, userId: number): Promise<number | undefined> {
    const [storedVistoria] = await db<Vistoria>('vistoria')
      .insert([{
        observacao: vistoria.observacao,
        fk_imovel_id: imovelId,
        fk_pessoa_id: userId
      }], '*').into('vistoria');

    await new MidiaProvider()
      .storeMidiasFromVistoria(
        vistoria.midias,
        storedVistoria.id
      );
    return storedVistoria.id;
  }
}
