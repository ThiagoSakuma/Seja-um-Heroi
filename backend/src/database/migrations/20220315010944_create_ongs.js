//Criação da tabela ong
exports.up = function(knex) {
    return knex.schema.createTable('ongs', function (table) {
        table.string('id').primary()
        table.string('nome').notNullable()
        table.string('email').notNullable()
        table.string('whatsapp').notNullable()
        table.string('sobre').notNullable()
        table.string('cidade').notNullable()
        table.string('uf',2).notNullable()
      })  
};
//Delete da tabela
exports.down = function(knex) {
  knex.schema.dropTable('ongs');
};
