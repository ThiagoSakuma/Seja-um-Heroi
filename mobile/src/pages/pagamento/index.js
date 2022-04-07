import React, { useState, useEffect} from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';
import { WebView } from 'react-native-webview';

export default function Pagamento() {

    const route = useRoute();
    const [url,setUrl] = useState();
    const navigation = useNavigation()

    useEffect(()=>{
        async function sendServer(){
            let response=await fetch('http://192.168.15.175:3333/',{
               method: 'POST',
               headers:{
                   Accept: 'application/json',
                   'Content-Type':'application/json'
               },
                body: JSON.stringify({
                  price: route.params.price,
                  title: route.params.title,
                })
            });
           
            let json = await response.json();
            setUrl(json);
        }
        sendServer();
    },[]);
    //Pega o status da transação
    async function stateChange(state) {
       //console.log(state);

        const url=state.url;
        if(state.canGoBack == true && !url.includes('mercadopago')) { //Verifica se ainda esta na fase de checkout
            if(url.includes("approved")) { 
                navigation.navigate('caso');
            } else {
                navigation.navigate('caso');
            }
        }
    }

    return(
        <View style={styles.container}>
            {/* se existir o estado url , então exibe o conteudo do webview */}
        {url &&
            <WebView
                    originWhitelist={['*']}
                    source={{uri: url}} /*chamando nosso estado url */
                    startInLoadingState={true}
                    onNavigationStateChange={state=>stateChange(state)}
            />
        }
        </View>
    )
}
