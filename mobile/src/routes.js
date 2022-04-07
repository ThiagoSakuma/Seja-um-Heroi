import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
import Caso from './pages/caso';
import Detalhe from './pages/detalhe';
import Pagamento from './pages/pagamento';

//Rotas que recebem o componente das paginas
export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="caso" component={Caso} />
        <Stack.Screen name="detalhe" component={Detalhe} />
        <Stack.Screen name="pagamento" component={Pagamento} />
      </Stack.Navigator>
    </NavigationContainer>
  ); 
}