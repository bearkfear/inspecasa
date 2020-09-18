import { Injectable } from '@graphql-modules/di';
import mapKeys from 'lodash/mapKeys';
import snakeCase from 'lodash/snakeCase';
import groupBy from 'lodash/groupBy';
import db from '@/database';
import { Pessoa } from '@/database/types/pessoa';
import getLogger from '@/log';
import admin from 'firebase-admin';
import Dataloader from 'dataloader';

const logger = getLogger('USUARIO');
logger.level = 'debug';

@Injectable()
export class Provider {
  private dataLoader = new Dataloader(async (uids: readonly string[]) => {
    const rows = groupBy(await db<Pessoa>('pessoa').whereIn('uid', uids), 'uid');
    return uids.map((uid) => rows[uid] || null);
  });

  async verificaUsuario (email: string): Promise<Pick<Pessoa, 'nome' | 'sobrenome' | 'url_img' | 'id'> | undefined> {
    let pessoaFirebase: null | admin.auth.UserRecord = null;
    try {
      pessoaFirebase = await admin.auth().getUserByEmail(email);
    } catch (error) {
      return null;
    }
    const pessoaDb = await this.getUserByUid(pessoaFirebase.uid);

    if (!pessoaDb) {
      return null;
    }

    return pessoaDb;
  }

  async getUserByUid (uid: string): Promise<Pessoa | undefined> {
    const [pessoa] = await this.dataLoader.load(uid);
    return pessoa;
  }

  getUserById (id: number) : Promise<Pessoa | undefined> {
    return this.show(id);
  }

  async updateLastAccess (id: number): Promise<void> {
    await db<Pessoa>('pessoa').update({ created_at: db.fn.now() }).where({ id });
  }

  show (id: number): Promise<Pessoa | undefined> {
    return db<Pessoa>('pessoa')
      .where({ id })
      .first()
      .then(resp => {
        logger.debug('show: ', id);
        return resp;
      })
      .catch(e => {
        logger.error(e);
        return undefined;
      });
  }

  list (limit = 20): Promise<Pessoa[] | undefined> {
    logger.debug('listando');

    return db<Pessoa>('pessoa')
      .where({ pessoa_tipo: '1' })
      .orderBy('created_at', 'desc')
      .limit(limit)
      .then((res) => {
        logger.debug(`listando ${limit}`);
        return res;
      }).catch(e => {
        logger.error(`Occoreu um erro: ${e}`);
        return undefined;
      });
  }

  async store (usuario: Omit<Pessoa, 'id'>, password: string): Promise<Pessoa | undefined> {
    const snakedValues = mapKeys(usuario, (_, key) => snakeCase(key));
    let firebaseUser = null;
    const payload: { [value: string]: any} = { ...snakedValues, pessoa_tipo: String(1) };

    try {
      firebaseUser = await admin.auth().createUser({
        email: usuario.email,
        password: password
      });
    } catch (erro) {
      throw new Error('Email já está em uso!');
    }

    payload.uid = firebaseUser.uid;

    try {
      const [response] = await db<Pessoa>('pessoa')
        .insert([payload], '*')
        .into('pessoa');
      logger.debug('Store new User: ');
      return response;
    } catch (error) {
      logger.error(error);
      throw new Error(JSON.stringify(error, null, 4));
    }
  }

  update (usuario: Pessoa): Promise<Pessoa | undefined> {
    const snakedCaseData = mapKeys(usuario, (_, key) => snakeCase(key));
    return db<Pessoa>('pessoa')
      .update(snakedCaseData, '*')
      .where({ id: usuario.id })
      .then(([resp]) => {
        logger.debug(`UPDATE pessoa ID: ${usuario.id}`);
        return resp;
      }).catch(e => {
        logger.error(e);
        return undefined;
      });
  }

  async delete (id: number): Promise<string> {
    const user = await db<Pessoa>('pessoa').select('uid').where({ id }).first();
    if (!user.uid) {
      throw new Error('usuário não existe!');
    } else {
      await db<Pessoa>('pessoa').where({ id }).del();
      await admin.auth().deleteUser(user.uid);
      return 'Usuário removido com sucesso!';
    }
  }
}
