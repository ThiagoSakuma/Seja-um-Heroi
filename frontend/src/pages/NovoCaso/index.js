import React, { useState } from 'react';
import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logo1 from '../../assets/logo1.png';

export default function NovoCaso() {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [desc, setDesc] = useState('');
  const [valor, setValor] = useState('');

  const ongId = localStorage.getItem('ongId');

  async function handleNovoCaso(e) {
    e.preventDefault();

    const data = {
      titulo,
      desc,
      valor
    };
    try {
      await api.post('caso', data, {
        headers: {
          Authorization: ongId
        }
      });
      navigate('/perfil');
    } catch (err) {
      alert("Erro ao cadastrar caso, tente novamente.");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section >
          <img src={logo1} alt="seja um heroi" />
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolve-lo.</p>
          <Link className="back-link" to="/perfil">
            <FiArrowLeft size={16} color="#E02041" />Voltar para o home</Link>
        </section>
        <form onSubmit={handleNovoCaso}>
          <input
            placeholder="Título do caso"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            require
          />
          <textarea
            placeholder="Descrição do caso"
            value={desc}
            onChange={e => setDesc(e.target.value)}
            required
          />
          <input
            placeholder="Valor em reais"
            value={valor}
            onChange={e => setValor(e.target.value)}
          />
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>

  );
}