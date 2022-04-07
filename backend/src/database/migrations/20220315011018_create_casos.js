//Criação da tabela caso
exports.up = function(knex) {
    return knex.schema.createTable('casos', function (table) {
        table.increments();
        table.string('titulo').notNullable()
        table.string('desc').notNullable()
        table.decimal('valor').notNullable()
        table.string('ong_id').notNullable()
  
        table.foreign('ong_id').references('id').inTable('ongs');
      })
  };
  //Deleteda tabela
  exports.down = function(knex) {
  knex.schema.dropTable('casos');
  };