const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
  /* listagem
  async index(request, response) {
    const ongs = await connection('ongs').select('*');
    return response.json(ongs);
  },*/

  async create(request, response) {
    const { nome, email, whatsapp, sobre, cidade, uf } = request.body; //campos da tabela
    const id = crypto.randomBytes(2).toString('HEX'); //gera 2 byte de caracteres aleatorios e converte em string em hexadecimal

    await connection('ongs').insert({ //insere os dados na tabela ongs
      id,
      nome,
      email,
      whatsapp,
      sobre,
      cidade,
      uf,
    });

    return response.json({ id }); //devolve o 'id' para logar
  },
}