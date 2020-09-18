import Knex from 'knex';

import { production, development } from '@/knexfile';
import getLogger from '@/log';

const logger = getLogger('DATABASE');
logger.level = 'debug';

logger.info('NODE_ENV: ', process.env.NODE_ENV);
logger.info('DB_CONNECTION: ', process.env.DB_CONNECTION);
export default Knex(
  process.env.NODE_ENV === 'production'
    ? production
    : development
);
