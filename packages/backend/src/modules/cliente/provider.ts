import { Injectable } from '@graphql-modules/di';
import DataLoader from 'dataloader';
import mapKeys from 'lodash/mapKeys';
import snakeCase from 'lodash/snakeCase';
import groupBy from 'lodash/groupBy';
import { Pessoa } from '@/database/types/pessoa';
import db from '@/database';
import getLogger from '@/log';

const logger = getLogger('PESSOA');
logger.level = 'debug';

@Injectable()
export class Provider {
  private dataLoader = new DataLoader(async (ids: readonly number[]) => {
    const rows = groupBy(await db<Pessoa>('pessoa').whereIn('id', ids), 'id');
    return ids.map((id) => rows[id] || null);
  });

  getProprietariosImovel (idImovel: number): Promise<Pessoa[]> {
    return db.raw(/* sql */`
      SELECT pessoa.*
      FROM pessoa 
      INNER JOIN pessoa_transacao on pessoa_transacao.fk_pessoa_id = pessoa.id
      INNER JOIN transacao on transacao.id = pessoa_transacao.fk_transacao_id
      WHERE transacao.id IN (
        SELECT transacao.id 
        FROM transacao 
        WHERE transacao.fk_imovel_id = ? 
        ORDER BY transacao.id DESC limit 1
      )
    `, [idImovel])
      .then((resp) => {
        return resp.rows;
      });
  }

  show (id: number): Promise<Pessoa | undefined> {
    return this.dataLoader.load(id).then(([resp]) => resp);
  }

  list (limit = 20): Promise<Pessoa[]> {
    return db<Pessoa>('pessoa')
      .where({ pessoa_tipo: '2' })
      .orderBy('created_at', 'desc')
      .limit(limit)
      .then((resp) => {
        logger.debug('listando');
        return resp;
      });
  }

  async store (pessoa: Omit<Pessoa, 'id'>): Promise<Pessoa | undefined> {
    const pes = mapKeys(pessoa, (_, key) => snakeCase(key));

    const [resp] = await db<Pessoa>('pessoa')
      .insert({ ...pes, pessoa_tipo: '2' }, '*')
      .into('pessoa');

    logger.debug(`STORE ID: ${resp.id}`);

    return resp;
  }

  async update (pessoa: Pessoa): Promise<Pessoa> {
    const pes = mapKeys(pessoa, (_, key) => snakeCase(key));
    const [updatedPessoa] = await db<Pessoa>('pessoa')
      .update({ ...pes, changed_at: db.fn.now() }, '*')
      .where({ id: pessoa.id });

    this.dataLoader.clear(pessoa.id);
    return updatedPessoa;
  }

  async delete (id: number): Promise<string | undefined> {
    await db<Pessoa>('pessoa').where({ id }).del();
    this.dataLoader.clear(id);
    return `${id} removida com sucesso!`;
  }
}
