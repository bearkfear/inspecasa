import { Injectable } from '@graphql-modules/di';
import DataLoader from 'dataloader';
import mapKeys from 'lodash/mapKeys';
import snakeCase from 'lodash/snakeCase';
import groupBy from 'lodash/groupBy';

import db from '@/database';
import { Endereco } from '@/database/types/endereco';

import getLogger from '@/log';

const logger = getLogger('ENDERECO');
logger.level = 'debug';

@Injectable()
export class Provider {
  private dataLoader = new DataLoader(async (ids: readonly number[]) => {
    const rows = groupBy((await this.listByImovelIds(ids)), 'fk_imovel_id');
    return ids.map(id => rows[id] || null);
  })

  async getEnderecosFromUser (id: number): Promise<Endereco[]> {
    return await db<Endereco>('endereco')
      .select('endereco.*')
      .join('pessoa_endereco', 'pessoa_endereco.fk_endereco_id', 'endereco.id')
      .where('pessoa_endereco.fk_pessoa_id', id);
  }

  async listByIds (ids: readonly number[]): Promise<Endereco[]> {
    return await db<Endereco>('endereco').whereIn('id', ids);
  }

  async listByImovelIds (ids: readonly number[]): Promise<Endereco[]> {
    return await db<Endereco>('endereco')
      .whereIn('fk_imovel_id', ids);
  }

  async getEnderecoFromImovel (id: number): Promise<Endereco> {
    const [resp] = await this.dataLoader.load(id);
    return resp;
  }

  async show (id: number): Promise<Endereco> {
    return await db<Endereco>('endereco').where({ id }).first();
  }

  async list (limit = 20): Promise<Endereco[]> {
    return await db('endereco').orderBy('created_at', 'desc').limit(limit);
  }

  async store (endereco: Omit<Endereco, 'id'>): Promise<Endereco> {
    const [resp] = await db<Endereco>('endereco').insert(
      mapKeys({
        ...endereco,
        cep: String(endereco.cep).replace(/-/g, '')
      }, (_, key) => snakeCase(key)), '*');
    logger.debug('Store: ', resp);
    return resp;
  }

  async update (endereco: Endereco): Promise<Endereco> {
    const derivatedData = { ...endereco, cep: String(endereco.cep).replace(/-/g, '') };
    const snakedCaseData = mapKeys(derivatedData, (_, key) => snakeCase(key));
    logger.debug(`UPDATE ENDERECO ID: ${endereco.id} | FK_ENDERECO_ID: ${endereco.fk_imovel_id}`);
    await db('endereco').update(snakedCaseData).where('id', endereco.id);
    return endereco;
  }

  async delete (id: number): Promise<string> {
    await db('endereco').where('id', id).del();
    return `${id} removido com sucesso!`;
  }
}
