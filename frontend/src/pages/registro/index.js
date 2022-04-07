import React, { useState } from 'react';
import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logo1 from '../../assets/logo1.png';

export default function Register() {
  //Armazenar o dados dos inputs atraves dos "estados"
  const [nome, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [sobre, setSobre] = useState('');
  const [cidade, setCity] = useState('');
  const [uf, setUf] = useState('');

  const navigate = useNavigate();

  async function handleRegister(e) { //Função responsavel pelo cadastro da ong, sem comportamento padrao de reload
    e.preventDefault();

    const data = {
      nome,
      email,
      whatsapp,
      sobre,
      cidade,
      uf
    };
    try {
      const response = await api.post('ongs', data); //Envia a "data" para a API pelo metodo POST
      alert(`Seu ID de acesso: ${response.data.id}`); //Devolde o id para o usuário, indicando que o cadastrou foi um sucesso
      navigate('/'); //Volta para pagina de "login"
    } catch (err) {
      alert('Erro no cadastro, tente novamente.');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logo1} alt="seja um heroi" />
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
          <Link className='link' to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para o Logon</Link>
        </section>
        <form onSubmit={handleRegister}> 
          <input
            placeholder="Nome da ONG"
            value={nome}
            onChange={e => setName(e.target.value)} /*Mudanças do input, colocando dentro da variavel que esta armazenada no "estado"  */
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />
          <input
            placeholder="Sobre"
            value={sobre}
            onChange={e => setSobre(e.target.value)}
          />
          <div className="input-group">
            <input
              placeholder="Cidade"
              value={cidade}
              onChange={e => setCity(e.target.value)}
            />
            <input
              placeholder="UF"
              value={uf}
              onChange={e => setUf(e.target.value)}
              style={{ width: 80 }}
            />
          </div>
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}