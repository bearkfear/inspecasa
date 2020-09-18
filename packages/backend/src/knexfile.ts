// Update with your config settings.
import { Config } from 'knex';

import getLogger from './log';
const logger = getLogger('KNEX');
logger.level = 'debug';

export const development: Config = {
  client: 'pg',
  connection: {
    database: 'reloaded',
    user: 'postgres',
    password: '123456'
  },
  pool: {
    min: 1,
    max: 4
  },

  migrations: {
    tableName: 'knex_migrations',
    directory: `${__dirname}/src/database/migrations`
  },
  seeds: {
    directory: `${__dirname}/src/database/seeds`
  },
  log: {
    warn (message) {
      logger.warn(message);
    },
    error (message) {
      logger.error(message);
    },
    deprecate (message) {
      logger.info(message);
    },
    debug (message) {
      logger.debug(message);
    }
  }

};

export const staging: Config = {
  client: 'postgresql',
  connection: {
    database: 'my_db',
    user: 'username',
    password: 'password'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: `${__dirname}/src/database/migrations`
  }
};

export const production: Config = {
  client: 'pg',
  connection: process.env.DB_CONNECTION,
  migrations: {
    tableName: 'knex_migrations',
    directory: `${__dirname}/src/database/migrations`
  },
  seeds: {
    directory: `${__dirname}/src/database/seeds`
  },
  pool: {
    min: 1,
    max: 4
  }

};

module.exports = { development, staging, production }; // for javascript node modules
