import React from 'react';
import { StyleSheet, Platform } from 'react-native';
// import { getStatusBarHeight } from 'react-native-status-bar-height';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/* Páginas
Home
ExibirRegistros
PesquisarRegistro
CadastrarRegistro
EditarRegistro
*/

import Home from "./src/pages/Home";
import CadastrarRegistro from './src/pages/CadastrarRegistro';
import ExibirRegistros from './src/pages/ExibirRegistros';
import PesquisarRegistro from "./src/pages/PesquisarRegistro";
import EditarRegistro from './src/pages/EditarRegistro';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Home'
            component={Home}
            options={{
              title: 'Home',
              headerShown: false
            }}
          />

          <Stack.Screen
            name='ExibirRegistros'
            component={ExibirRegistros}
            options={{
              title: 'Usuarios Cadastrados',
            }}
          />

          <Stack.Screen
            name='PesquisarRegistro'
            component={PesquisarRegistro}
            options={{
              title: 'Pesquisar Registro',
            }}
          />
          
          <Stack.Screen
            name='CadastrarRegistro'
            component={CadastrarRegistro}
            options={{
              title: 'Cadastrar Registro',
            }}
          />

          {/* <Stack.Screen
            name='EditarRegistro'
            component={EditarRegistro}
            options={{
              title: 'Editar Registro',
            }}
          /> */}

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
    marginTop: 10
  },
  container: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    gap: 10
  },
  containerScroll: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    gap: 5
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  clienteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonTable: {
    flexDirection: 'row',
    gap: 15
  }
});