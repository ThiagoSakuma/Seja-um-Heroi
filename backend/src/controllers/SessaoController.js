const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { id } = request.body; // busca o id da ong atraves do corpo da requisição
    const ong = await connection('ongs').where('id', id).select('nome').first(); //busca da ong no BD

    if (!ong) {
      return response.status(400).json({ error: 'Nenhuma ONG encontrada com este login' }); 
    }

    return response.json(ong); // retorno a ong
  },
};