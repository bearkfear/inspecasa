import snakeCase from 'lodash/snakeCase';

export function fieldResolver (root, _, __, { fieldName }) {
  return root[snakeCase(fieldName)];
}
