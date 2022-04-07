import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';
import logoImg from '../../assets/image.png';
import styles from './styles';

export default function Casos() {
  const [caso, setCaso] = useState([])
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation()

  function goDetalhe(caso) {
    navigation.navigate('detalhe',{caso}) //Navegação passando o nome do parametro par aa rota de 'detalhe'
  }
  //Carrega a lista de casos + paginação
  async function carregarCasos() {
    if (loading) {
      return;
    }
    if (total > 0 && caso.length === total) {
      return;
    }
    setLoading(true)

    const response = await api.get('caso', {params: {page}}); //envia o numero da pagina para a API
    setCaso(response.data)
    setCaso([...caso, ...response.data]); //Não sobrescrever os casos ja cadastrados, apens anexar aos ja exibidos(anexa 2 vetores em 1 unico)
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    carregarCasos();
  },[])

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
        Total de <Text style={styles.headerTextBold}>{total} casos</Text>
        </Text>
      </View>
      <Text styles={styles.titulo}>Bem vindo !</Text>
      <Text styles={styles.descricao}>Escolha um caso abaixo e salve o dia</Text>

      <FlatList
      data={caso} //dados que montam a lista
      style={styles.casoLista}
      keyExtractor={caso => String(caso.id)} //Informação unica igual na web
      showsVerticalScrollIndicator={false} //Remove o a barra do scroll
      onEndReached={carregarCasos} //função disparada automatica ao chegar no final da lista
      onEndReachedThreshold={0.2} //% do usuário estar no final da lista para carregar novos
      renderItem={({item: caso}) => ( //função que renderiza cada item, recebendo o parametro 'item' que é o prorpio 'caso'
        <View style={styles.caso}>
        <Text style={styles.casoProperty}>NOME DA ONG:</Text>
        <Text style={styles.casoValue}>{caso.nome}</Text>

        <Text style={styles.casoProperty}>TITULO DO CASO:</Text>
        <Text style={styles.casoValue}>{caso.titulo}</Text>

        <Text style={styles.casoProperty}>VALOR:</Text>
        <Text style={styles.casoValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(caso.valor)}</Text>

        <TouchableOpacity style={styles.detalheBotao} onPress={() => goDetalhe(caso)}>
          <Text style={styles.detalheBotaoText}>Ver mais detalhes</Text>
          <Feather name='arrow-right' size={16} color="#E02041"></Feather>
        </TouchableOpacity>
      </View>
      )}
      />
    </View>
  )
}