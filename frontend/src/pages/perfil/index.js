import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';
import logo1 from '../../assets/logo1.png';

export default function Profile() {
  const navigate = useNavigate();
  const [casos, setCasos] = useState([]);//
  const ongId = localStorage.getItem('ongId'); //busca no storage o id para passar no header
  const ongNome = localStorage.getItem('ongNome');//Busca no storage o nome da ong, para por no cabeçalho
  useEffect(() => { //Disparar uma função em determinando momento do componente, por exemplo assim que ele pe mostrado em tela, parametros qual     função e quando vai ser executado
    api
      .get('perfil', {//rota + passar a ong que esta logada atraves do header
        headers: {
          Authorization: ongId,
        }, 
      })
      .then( (response) => { // grava as respostas nos estados
        setCasos(response.data); 
      });
  }, [ongId]);

  async function handleDeleteCaso(id) { //Recebe o id do caso
    try { 
      await api.delete(`caso/${id}`, { //Exlusão + envio do header de autorização com id da ong que esta deletando o caso
        headers: {
          Authorization: ongId,
        },
      });
      setCasos(casos.filter((casos) => casos.id !== id)); //Atualiza a tela apos o caso deletado, realiziando varredura no array de caso buscando pelo id
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente.');
    }
  }

  function handleLogout() {
    localStorage.clear();//Limpa o storage com o do id e nome
    navigate('/'); //Redireciona para a tela de login
  }

  return (
    <div className='profile-container'>
      <header>
        <div className='header-logo'>
          <img src={logo1} alt='Seje um heroi' />
          <span>Bem vinda, {ongNome}</span>
        </div>
        <div className='header-buttons'>
          <Link className='button' to='/caso/novo'>
            Cadastrar novo caso
          </Link>
          <button onClick={handleLogout} type='button'>
            <FiPower size={18} color='#e02041' />
          </button>
        </div>
      </header>
      <h1>Casos cadastrados</h1>
      <ul>
        {casos.map((casos) => ( /*Percorre cada um deles retornando alguma coisa*/
          <li key={casos.id}> 
            <strong>CASO:</strong>
            <p>{casos.titulo}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{casos.desc}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                casos.valor
              )}
            </p>
            <button onClick={() => handleDeleteCaso(casos.id)} type='button'>
              <FiTrash2 size={20} color='#a8a8b3' />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}