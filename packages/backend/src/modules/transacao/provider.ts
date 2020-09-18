import { Injectable } from '@graphql-modules/di';
import knex from '@/database';
import { Transacao } from '@/database/types/transacao';
@Injectable()
export class Provider {
  async getTransacoesFromUsuario (id: number): Promise<Transacao[]> {
    const transacoesUsuario = await knex<Transacao>('transacao')
      .select('transacao.*')
      .innerJoin('pessoa', 'pessoa.id', 'transacao.fk_pessoa_id')
      .orderBy('transacao.id', 'desc')
      .where('pessoa.id', '=', id);

    return transacoesUsuario.map((trx: Transacao) => ({
      ...trx,
      valor: trx.valor_total
    }));
  }
}
