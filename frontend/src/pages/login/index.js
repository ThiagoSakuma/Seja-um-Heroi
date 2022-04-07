import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './styles.css'
import logo1 from '../../assets/logo1.png';
import api from '../../services/api'
import { FiLogIn } from 'react-icons/fi';

export default function Login() {
    const [id, setId] = useState(''); //Estado que armazena o id
    const navigate = useNavigate();
  
    async function handleLogin(e) { //Função que valida o login
      e.preventDefault();
  
      try {
        const response = await api.post('sessao', { id });
        localStorage.setItem('ongId', id); //Salvo p/ toda a aplicação, para identificação da ong logada
        localStorage.setItem('ongNome', response.data.nome); //Mesma coisa da linha acima
        navigate('/perfil'); //Manda para a rota dos casos
      } catch (err) {
        alert('Falha no login, tente novamente.');
      }
    }
    return (    
      <div className='login-container'>
        <section className='form'>
          <img src={logo1} alt='Seja um heroi'/>
          <form onSubmit={handleLogin}> {/* chamada da função*/}
            <h1>Faça seu login</h1>
            <input placeholder="Seu ID" value={id} onChange={(e) => setId(e.target.value)}/>
            <button  className="button" type="submit">Entrar</button>
            <Link className='link' to="/registro"><FiLogIn size={16} color='#e02041' />Não tenho cadastro</Link>
          </form>
        </section>
      </div>     
      );
}