import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/image.png';
import styles from './styles';

export default function Detalhe() {

const navigation = useNavigation()
const route = useRoute();//Pega as info especificas da pagina atual
const caso = route.params.caso; //Todos os parametros que a rota recebeu e nome do parametro enviado
const mensagem = `Estou entrando em contato para falar sobre o caso "${caso.titulo}", no valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(caso.valor)}`

function Voltar(){
  navigation.goBack() 
}

function email() {
  MailComposer.composeAsync({
    subject: `Herói do caso: ${caso.titulo}`,
    recipients: [caso.email],
    body: mensagem,
  })
}

function whatspp() {
  Linking.openURL(`whatsapp://send?phone=${caso.whatsapp}&text=${mensagem}`)
}

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} /> 
        <TouchableOpacity onPress={Voltar}>
          <Feather name='arrow-left' size={28} color="#E82041" />
        </TouchableOpacity>
      </View>

      <View style={styles.caso}>
        <Text style={[styles.casoProperty, { marginTop: 0 }]}>ONG</Text>
        <Text style={styles.casoValue}>{caso.nome} de {caso.cidade}/{caso.uf}</Text>

        <Text style={styles.casoProperty}>DESCRIÇÃO</Text>
        <Text style={styles.casoValue}>{caso.desc}</Text>

        <Text style={styles.casoProperty}>VALOR</Text>
        <Text style={styles.casoValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(caso.valor)}</Text>
      </View>

        <View style={styles.contato}>
          <Text style={styles.heroiTitulo}>Salve o dia, seja o heroi deste caso</Text>
          <Text style={styles.heroiDescricao}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={whatspp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={email}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>

          <Text style={styles.heroiDescricao}>Realize um pagamento:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={() => navigation.navigate('pagamento', {price:caso.valor, title:caso.titulo})} >
            <Text style={styles.actionText}>Pagar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}