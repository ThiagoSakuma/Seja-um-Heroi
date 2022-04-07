const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
      const { page = 1 } = request.query; //busca do parametro page, se não encontrar padrao = 1
  
      const [count] = await connection('casos').count();//quantidade de casos cadastrados na tabela casos
      // paginação
      const caso = await connection('casos')
        .join('ongs', 'ongs.id', '=', 'casos.ong_id')
        .limit(5) //limita a 5 casos para mostrar
        .offset((page - 1) * 5)//esquema da paginação
        .select(['casos.*', 'ongs.nome', 'ongs.email', 'ongs.whatsapp', 'ongs.sobre', 'ongs.cidade', 'ongs.uf']);// seleção dos campos
  
      response.header('X-Total-Count', count['count(*)']);// retorna pelo cabeçalho da resposta da requisição (nome do cabeçalho + propriedade acessada)
      return response.json(caso);
    },

  async create(request, response) {
    const { titulo, desc, valor } = request.body; //campos da tabela
    const ong_id = request.headers.authorization; // autenticação da ong vem pelo cabeçalho, não corpo da requisição

    const [id] = await connection('casos').insert({ //insere os dados na tabela casos
      titulo,
      desc,
      valor,
      ong_id,
    });

    return response.json({ id });// devolve o id
  },

  async delete(request, response) {
    const { id } = request.params; //Pega o id do caso
    const ong_id = request.headers.authorization; //pega o id da ong logada p/ identificar se foi ela que criou o caso

    const caso = await connection('casos').where('id', id).select('ong_id').first(); // busca na tabela caso

    if (caso.ong_id != ong_id) {
      return response.status(401).json({ error: 'Operação não permitida' });
    }

    await connection('casos').where('id', id).delete(); //deleta o registro

    return response.status(204).send();
  },
};