import { Injectable } from '@graphql-modules/di';
import { Pessoa } from '@/database/types/pessoa';
import db from '@/database';
import getLogger from '@/log';

const logger = getLogger('PESSOA');
logger.level = 'debug';

@Injectable()
export class Provider {
  async verificaEmail (email: string) {

  }
}
