import { Injectable } from '@graphql-modules/di';
import mapKeys from 'lodash/mapKeys';

import snakeCase from 'lodash/snakeCase';

import { Anexo } from '@/database/types/anexo';
import db from '@/database';
import getLogger from '@/log';

const logger = getLogger('Midia');
logger.level = 'debug';

type Midia = Anexo;

type MidiaInput = Pick<Midia, 'url' | 'extensao' | 'descricao'>

@Injectable()
export class Provider {
  getMidiasFromVistoria (id: number): Promise<Midia[] | undefined> {
    return db<Midia>('anexo')
      .where({ fk_vistoria_id: id, tipo: 'midia' })
      .then(resp => {
        logger.debug(`getMidiasFromVistoria: ${id}`);
        return resp || [];
      });
  }

  getMidiasFromImovel (id: number): Promise<Midia[] | undefined> {
    return db<Midia>('anexo')
      .where({ fk_imovel_id: id, tipo: 'midia' })
      .then(resp => {
        logger.debug(`getMidiasFromImovel: ${id}`);
        return resp || [];
      });
  }

  show (id: number): Promise<Midia | undefined> {
    return db<Midia>('anexo')
      .where({ id })
      .first()
      .then(resp => {
        logger.debug(`mostrando pelos id: ${id}`);
        return resp;
      });
  }

  list (limit = 20): Promise<Midia[] | undefined> {
    return db<Midia>('anexo')
      .where({ tipo: 'midia' })
      .limit(limit)
      .orderBy('created_at', 'desc')
      .then((resp) => {
        logger.debug('listando');
        return resp;
      });
  }

  async storeMidiasFromVistoria (midias: MidiaInput[], vistoriaId: number): Promise<Midia[] | undefined> {
    const changedMidias: Partial<Midia>[] = midias.map(midia => ({
      ...midia,
      fk_vistoria_id: vistoriaId,
      tipo: 'midia'
    }));
    return db<Midia>('anexo').insert(changedMidias, '*');
  }

  async store (midia: MidiaInput, imovelId: number): Promise<Midia | undefined> {
    const [resp] = await db<Midia>('anexo')
      .insert({
        ...midia,
        tipo: 'midia',
        fk_imovel_id: imovelId
      }, '*')
      .into('anexo');
    return resp;
  }

  update (midia: Midia): Promise<Midia | undefined> {
    const mappedKeys = mapKeys(midia, (_, key) => snakeCase(key));
    return db<Midia>('anexo')
      .update(mappedKeys)
      .where('id', midia.id)
      .then(() => {
        logger.debug(`UPDATE Midia ID: ${midia.id}`);
        return midia;
      });
  }

  delete (id: number): Promise<string> {
    return db<Midia>('anexo').where('id', id).del().then(() => {
      return `${id} removido com sucesso!`;
    });
  }
}
