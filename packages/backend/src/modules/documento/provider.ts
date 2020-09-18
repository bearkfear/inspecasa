import db from '@/database';
import mapKeys from 'lodash/mapKeys';
import snakeCase from 'lodash/snakeCase';
import { Injectable } from '@graphql-modules/di';
import { Anexo } from '@/database/types/anexo';

import getLogger from '@/log';

const logger = getLogger('DOCUMENTO');
logger.level = 'debug';

@Injectable()
export class Provider {
  async getDocsFromImovelId (id: number): Promise<Anexo[]> {
    const resp = await db<Anexo>('anexo')
      .where('fk_imovel_id', id)
      .andWhere('tipo', '=', 'documento');

    return resp || [];
  }

  async show (id: number): Promise<Anexo> {
    logger.debug(`mostrando pelos id: ${id}`);
    return await db<Anexo>('anexo')
      .where({ id })
      .andWhere('tipo', '=', 'documento')
      .first();
  }

  async list (limit = 20): Promise<Anexo[]> {
    return await db<Anexo>('anexo').limit(limit).orderBy('created_at', 'desc');
  }

  async store (doc: Omit<Anexo, 'id'>, imovelId: number): Promise<Anexo> {
    const snakedValues = mapKeys(doc, (_, key) => snakeCase(key));
    const [resp] = await db<Anexo>('anexo')
      .insert({ ...snakedValues, fk_imovel_id: imovelId, tipo: 'documento' }, '*')
      .into('anexo');
    return resp;
  }

  async update (doc: Anexo): Promise<Anexo> {
    const snakedCaseData = mapKeys(doc, (_, key) => snakeCase(key));
    await db<Anexo>('anexo')
      .update(snakedCaseData)
      .where('id', doc.id);
    return doc;
  }

  async delete (id: number): Promise<string> {
    await db('anexo')
      .where('id', id)
      .del();
    return 'Removido com sucesso!';
  }
}
