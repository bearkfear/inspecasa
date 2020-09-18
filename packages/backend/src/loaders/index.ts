import DataLoader from 'dataloader';
import groupBy from 'lodash/groupBy';

export default function createLoaders () {
  return {
    // imoveis: new DataLoader(async (ids: readonly number[]) => {
    //   const rows = groupBy((await API.Imovel.listByIds(ids)), 'id');
    //   return ids.map(id => rows[id] || null);
    // }),
    // enderecos: new DataLoader(async (ids: readonly number[]) => {
    //   const rows = await API.Endereco.listByImovelIds(ids);
    //   const luckup = groupBy(rows, 'fk_imovel_id');

    //   return ids.map(id => luckup[id] || null);
    // })
  };
}
