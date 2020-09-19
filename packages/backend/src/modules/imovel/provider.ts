import { Injectable } from '@graphql-modules/di';
import db from '@/database';
import getLogger from '@/log';
import { Imovel } from '@/database/types/imovel';
import mapKeys from 'lodash/mapKeys';
import snakeCase from 'lodash/snakeCase';
import { Transacao } from '@/database/types/transacao';
import { PessoaTransacao } from '@/database/types/pessoa_transacao';

const logger = getLogger('IMOVEL');
logger.level = 'debug';

@Injectable()
export class Provider {
  async venderImovel (
    id: number,
    compradores: number[],
    valor: number,
    vendedor: number,
    situacao: number
  ): Promise<void> {
    const valorDividido = valor / compradores.length;
    await db.transaction(async trx => {
      try {
        await trx<Imovel>('imovel').update({ situacao, valor_proposta: valor }).where({ id });

        const [transacao] : number[] = await trx.insert({
          fk_imovel_id: id,
          fk_pessoa_id: vendedor,
          valor_total: valor
        }, 'id').into<Transacao>('transacao');

        await trx<PessoaTransacao>('pessoa_transacao').insert(
          compradores.map(comprador => ({
            valor: valorDividido,
            fk_pessoa_id: comprador,
            fk_transacao_id: transacao,
            tipo: 'compra'
          }))
        );

        await trx.commit();
      } catch (error) {
        console.log('error', error);
        trx.rollback();
        throw new Error('Ocorreu um problema ao efetuar a venda');
      }
    });
  }

  show (id: number): Promise<Imovel> {
    return db<Imovel>('imovel')
      .where('id', id)
      .first().then(resp => {
        logger.debug(`SHOW - id: ${id}`);
        return resp;
      });
  }

  listByIds (ids: readonly number[]): Promise<Imovel[]> {
    return db<Imovel>('imovel')
      .whereIn('id', ids).then(resp => {
        logger.debug(`Listando ${ids.join(', ')}`);
        return resp;
      }).catch(e => {
        logger.error(`ListByIds, ${e}`);
        return undefined;
      });
  }

  async list (limit = 20): Promise<Imovel[]> {
    const resp = await db<Imovel>('imovel')
      .where('situacao', '=', '1')
      .orderBy('id', 'desc')
      .limit(limit);
    return resp;
  }

  store (imovel: Omit<Imovel, 'id'>): Promise<Imovel | undefined> {
    const data = mapKeys(imovel, (_, key) => snakeCase(key));

    return db
      .insert(data, '*')
      .into<Imovel>('imovel')
      .then(([resp]) => {
        logger.debug('Store');
        return resp;
      })
      .catch(e => {
        logger.error(`Store ${e}`);
        return undefined;
      });
  }

  /**
   * @description Cria um imóvel, registrando sua primeira instancia como transacao do tipo venda.
   * @param imovel Imovel a ser adicionado
   * @param owners Proprietários do imóvel
   * @param vendedor Funcionario que efetou a venda, nesse momento apenas o cadastro
   */
  async createImovel (
    imovel: Partial<Imovel>,
    owners: number[],
    vendedor: string
  ): Promise<Imovel> {
    /**
     * @description Identificador do imóvel
     */
    let imovelId = 0;

    /**
     * @description
     * Valor da transacao, quando criado o imovel o valor proposto é divido entre os seus proprietários
     */
    const valorDividido = imovel.valor_proposta / owners.length;

    await db.transaction(async (trx) => {
      try {
        const [imovelResp] = await trx
          .insert(imovel, '*')
          .into<Imovel>('imovel');

        imovelId = imovelResp.id;
        const [transacaoResp] = await trx
          .insert({
            valor_total: imovelResp.valor_proposta,
            fk_pessoa_id: vendedor,
            fk_imovel_id: imovelResp.id
          }, '*')
          .into('transacao');

        const pT = owners.map(owner => ({
          fk_pessoa_id: owner,
          fk_transacao_id: transacaoResp.id,
          tipo: 'compra',
          valor: valorDividido.toFixed(2)
        }));

        await trx
          .insert(pT)
          .into('pessoa_transacao');

        return await trx.commit();
      } catch (error) {
        trx.rollback();
        throw new Error(error);
      }
    });

    return await this.show(imovelId);
  }

  async update (imovel: Imovel): Promise<Imovel | undefined> {
    const snakedData = mapKeys(imovel, (_, key) => snakeCase(key));
    logger.debug(`update ID:${imovel.id} : | ${snakedData}`);
    await db('imovel').update(snakedData).where('id', snakedData.id);
    return imovel;
  }

  async delete (id: number): Promise<string> {
    await db.transaction(async trx => {
      try {
        await trx('endereco').where({ fk_imovel_id: id }).del();

        const transacoes = await trx<Transacao>('transacao').select('id').where({ fk_imovel_id: id });
        transacoes.forEach(async (transacao) => {
          await trx<PessoaTransacao>('pessoa_transacao').where({ fk_transacao_id: transacao.id }).del();
        });

        await trx<Transacao>('transacao').where({ fk_imovel_id: id }).del();

        await trx<Imovel>('imovel').where({ id }).del();

        await trx.commit();
      } catch (error) {
        trx.rollback();
        throw new Error(error);
      }
    });

    await db('endereco').update({ fk_imovel_id: null }).where('fk_imovel_id', id);
    await db('imovel').where('id', id).del();
    logger.debug(`delete ID:${id}`);
    return 'imovel removido com sucesso';
  }
}
