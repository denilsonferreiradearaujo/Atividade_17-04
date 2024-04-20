import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, SafeAreaView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { DatabaseConnection } from '../../database/database';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Abra ou crie o banco de dados SQLite
const db = new DatabaseConnection.getConnection; // 

export default function PesquisarRegistro() {
  const [todos, setTodos] = useState([]);

  // Função utilizada para atualizar os registros

  const PesquisarRegistro = () => {
    console.log('função Pesquisar Registro acionada')
    try {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM clientes_has_telefones',
          //'_array' é uma propriedade do objeto rows retornado pela consulta SQL, em rows._array, o '_' não se refere diretamente a rows, mas sim ao objeto retornado pela transação SQL. 
          [],
          (_, { rows }) => {
            // O '_array' é uma propriedade desse objeto que contém os resultados da consulta em forma de array.
            setTodos(rows._array);
            console.log(_array)
            console.log(rows)
          },
          (_, error) => {
            // O '_array' é uma propriedade desse objeto que contém os resultados da consulta em forma de array.
            console.log(error);
          }
        );
      });
    } catch (error) {
      console.error('Erro ao buscar todos:', error);
    }
  };

  // useEffect que chama a função para atualizar os registros
  useEffect(() => {
    PesquisarRegistro();
  }, []);


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.androidSafeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>Pesquisar Registros</Text>
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.containerScroll}>
            {/* A propriedade key é usada pelo React para identificar de forma única cada elemento na lista, o que é crucial para que o React possa otimizar a renderização e o desempenho. */}
            {todos.map(usuario => (
              <View key={usuario.id} style={styles.usuarioItem}>
                
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


/**
 * Estilização dos componentes
 */
const styles = StyleSheet.create({
  botaoAdd: {
    color: 'red'
  },

  androidSafeArea: {
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
    marginTop: 60
  },

  container: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    gap: 10
  },

  containerScroll: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    gap: 5
  },

  title: {
    fontSize: 26,
    letterSpacing: 6,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#873fda',
    marginBottom: 20,
  },

  usuarioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBlockColor: '#333',
    borderWidth: 2,
    borderRadius: 7,
    padding: 5,
  },

  linha: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#873fda',
    margin: 2,
    marginBottom: 1,
    fontSize: 20,
  },

  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },

  buttonTable: {
    flexDirection: 'row',
    gap: 15
  }
});