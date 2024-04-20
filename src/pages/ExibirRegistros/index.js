import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, SafeAreaView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { DatabaseConnection } from '../../database/database';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

// Abra ou crie o banco de dados SQLite
const db = new DatabaseConnection.getConnection; // 

export default function ExibirRegistros() {
  const [todos, setTodos] = useState([]);

  // Função utilizada para atualizar os registros

  const ExibirRegistros = () => {
    console.log('função Exibir Registro acionada')
    try {
      db.transaction(tx => {
        tx.executeSql(
          // `SELECT *
          // FROM clientes_has_telefones`,

          `SELECT c.nome, c.data_nasc, t.numero, t.tipo
          FROM tbl_clientes c 
          JOIN clientes_has_telefones ct ON c.id = ct.id_clientes
          JOIN tbl_telefones t ON ct.id_telefones = t.id`,
          //'_array' é uma propriedade do objeto rows retornado pela consulta SQL, em rows._array, o '_' não se refere diretamente a rows, mas sim ao objeto retornado pela transação SQL. 
          [],
          (_, { rows }) => {
            // O '_array' é uma propriedade desse objeto que contém os resultados da consulta em forma de array.
            setTodos(rows._array);
            console.log(rows._array)
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
    ExibirRegistros();
  }, []);

  // Função utilizada para excluir um registro
  const deletarUsuario = (idCliente) => {
    db.transaction(
      tx => {
        // Primeiro, remover registros associados nas tabelas de telefones
        tx.executeSql(
          'DELETE FROM clientes_has_telefones WHERE id_clientes =? AND id_telefones =?',
          [idCliente, idTelefones],
          (_, { rowsAffected }) => {
            console.log(`Telefones excluídos: ${rowsAffected}`);
          },
          (_, error) => {
            console.error('Erro ao excluir telefones', error);
            Alert.alert('Erro', 'Ocorreu um erro ao excluir telefones!');
          }
        );

        // Segundo, remover os registros da tabela de relação
        tx.executeSql(
          'DELETE FROM clientes_has_telefones WHERE id_clientes = ?',
          [idCliente],
          (_, { rowsAffected }) => {
            console.log(`Relações excluídas: ${rowsAffected}`);
          },
          (_, error) => {
            console.error('Erro ao excluir relação', error);
            Alert.alert('Erro', 'Ocorreu um erro ao excluir relação!');
          }
        );

        // Terceiro, remover o cliente
        tx.executeSql(
          'DELETE FROM tbl_clientes WHERE id = ?',
          [idCliente],
          (_, { rowsAffected }) => {
            console.log(`Cliente excluído: ${rowsAffected}`);
            if (rowsAffected > 0) {
              ExibirRegistros();
              Alert.alert('Sucesso', 'Registro excluído com sucesso!');
            } else {
              Alert.alert('Erro', 'Registro não excluído, verifique e tente novamente!');
            }
          },
          (_, error) => {
            console.error('Erro ao excluir o cliente', error);
            Alert.alert('Erro', 'Ocorreu um erro ao excluir o cliente!');
          }
        );
      },
      error => {
        console.error('Erro na transação', error);
      },
      () => {
        console.log('Transação de exclusão concluída');
      }
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.androidSafeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>Registros Cadastrados</Text>
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.containerScroll}>
            {/* A propriedade key é usada pelo React para identificar de forma única cada elemento na lista, o que é crucial para que o React possa otimizar a renderização e o desempenho. */}
            {todos.map(usuario => (
              <View key={usuario.id} style={styles.usuarioItem}>

                {/* <View>
                  <Text style={styles.linha}>Id: </Text>
                  <Text style={styles.linha}>{usuario.id}</Text>
                </View> */}

                <View>
                  <Text style={styles.linha}>Nome: </Text>
                  <Text style={styles.linha}>{usuario.nome}</Text>
                </View>

                <View>
                  <Text style={styles.linha}>Data Nasc.: </Text>
                  <Text style={styles.linha}>{usuario.data_nasc}</Text>
                </View>

                <View>
                  <Text style={styles.linha}>Tel.: </Text>
                  <Text style={styles.linha}>{usuario.numero}</Text>
                </View>

                <View>
                  <Text style={styles.linha}>Tipo tel.: </Text>
                  <Text style={styles.linha}>{usuario.tipo}</Text>
                </View>

                <TouchableOpacity onPress={() => {
                  Alert.alert(
                    "Atenção!",
                    'Deseja excluir o registro selecionado?',
                    [
                      {
                        text: 'Cancelar',
                        onPress: () => { return }
                      },
                      {
                        text: 'OK',
                        onPress: () => deletarUsuario(usuario.id)
                      }

                    ],
                  )
                }}>
                  <FontAwesome6 name='trash-can' color='red' size={24} />
                </TouchableOpacity>
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
    padding: 8,
  },

  linha: {
    // fontWeight: 'bold',
    textAlign: 'center',
    color: '#873fda',
    margin: 2,
    marginBottom: 1,
    fontSize: 15,
    paddingLeft: 5,
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