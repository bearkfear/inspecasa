import * as Knex from 'knex';

export async function up (knex: Knex): Promise<any> {
  return knex.schema.createTable('pessoa', t => {
    t.increments('id');
    t.string('nome');
    t.string('sobrenome');
    t.string('email').unique().notNullable();
    t.text('bio');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('changed_at').defaultTo(knex.fn.now());
    t.string('funcao');
    t.enum('pessoa_tipo', [1, 2]); // 1 funcionario, 2 cliente;
    t.string('uid', 28).unique();
    t.string('url_img');
  }).createTable('imovel', t => {
    t.increments('id');
    t.text('descricao');
    t.decimal('valor_proposta', 20, 2);
    t.string('categoria');
    t.integer('num_quartos', 4).unsigned();
    t.integer('situacao');
  }).createTable('endereco', t => {
    t.increments('id');
    t.string('rua');
    t.string('logradouro');
    t.string('complemento');
    t.integer('numero').unsigned();
    t.string('uf', 2);
    t.string('cep', 8);
    t.string('avenida');
    t.string('cidade');
    t.string('bairro');
    t.integer('fk_imovel_id').unsigned();
    t.foreign('fk_imovel_id').references('imovel.id');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
  }).createTable('pessoa_endereco', t => {
    t.integer('fk_pessoa_id').unsigned();
    t.integer('fk_endereco_id').unsigned();
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
    t.foreign('fk_pessoa_id').references('pessoa.id');
    t.foreign('fk_endereco_id').references('endereco.id');
  }).createTable('vistoria', t => {
    t.increments('id');
    t.text('observacao');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
    t.integer('fk_pessoa_id').unsigned();
    t.integer('fk_imovel_id').unsigned();
    t.foreign('fk_pessoa_id').references('pessoa.id');
    t.foreign('fk_imovel_id').references('imovel.id');
  }).createTable('transacao', t => {
    t.increments('id');
    t.decimal('valor_total');
    t.timestamp('data').defaultTo(knex.fn.now());
    t.integer('fk_pessoa_id').unsigned();
    t.integer('fk_imovel_id').unsigned();
    t.foreign('fk_pessoa_id').references('pessoa.id');
    t.foreign('fk_imovel_id').references('imovel.id');
  }).createTable('pessoa_transacao', t => {
    t.integer('fk_pessoa_id').unsigned();
    t.integer('fk_transacao_id').unsigned();
    t.foreign('fk_pessoa_id').references('pessoa.id');
    t.foreign('fk_transacao_id').references('transacao.id');
    t.enum('tipo', ['compra', 'venda']);
    t.decimal('valor');
  }).createTable('anexo', t => {
    t.increments('id');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('changed_at').defaultTo(knex.fn.now());
    t.string('extensao').notNullable();
    t.string('url').notNullable().unique();
    t.string('tempo_duracao');
    t.text('descricao');
    t.enum('tipo', ['documento', 'midia']);
    t.integer('fk_imovel_id').unsigned();
    t.integer('fk_vistoria_id').unsigned();
    t.foreign('fk_imovel_id').references('imovel.id');
    t.foreign('fk_vistoria_id').references('vistoria.id');
  });
}

export async function down (knex: Knex): Promise<any> {
  await knex.schema.dropTableIfExists('anexo');
  await knex.schema.dropTableIfExists('pessoa_transacao');
  await knex.schema.dropTableIfExists('transacao');
  await knex.schema.dropTableIfExists('vistoria');
  await knex.schema.dropTableIfExists('imovel');
  await knex.schema.dropTableIfExists('pessoa_endereco');
  await knex.schema.dropTableIfExists('endereco');
  await knex.schema.dropTableIfExists('pessoa');
}
