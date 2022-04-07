const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const ong_id = request.headers.authorization; // autenticação da ong vem pelo cabeçalho, não corpo da requisição
    const caso = await connection('casos').where('ong_id', ong_id).select('*'); // busca na tabela casos

    return response.json(caso); //retorno os casos
  },
};