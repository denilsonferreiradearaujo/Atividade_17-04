import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, SafeAreaView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { DatabaseConnection } from '../../database/database';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Abra ou crie o banco de dados SQLite
const db = new DatabaseConnection.getConnection; // 

export default function CadastrarRegistro() {
  const [nome, setNome] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [numero, setNumero] = useState('');
  const [tipo, setTipo] = useState('');
  // const [idCliente, setIdCliente] = useState('');
  // const [idTelefone, setIdTelefone] = useState('');

  // Função utilizada para cadastrar os registros

  const CadastrarRegistro = () => {
    console.log('Acionando a função Cadastrar normalmente!')

    if (nome.trim() === '') {
      Alert.alert('Erro', 'Por favor, insira um texto válido');
      return;

    } else {
      db.transaction(
        tx => {
          tx.executeSql(
            'INSERT INTO tbl_clientes (nome, data_nasc) VALUES (?,?)',
            [nome, dataNasc],
            (_, {insertId:idCliente}) => {

              tx.executeSql(
                'INSERT INTO tbl_telefones (numero, tipo) VALUES (?,?)',
                [numero, tipo],
                (_, {insertId:idTelefone}) => {

                  tx.executeSql(
                    'INSERT INTO clientes_has_telefones (id_clientes, id_telefones) VALUES (?,?)',
                    [idCliente, idTelefone],
                    (_, { rowsAffected }) => {
                      console.log(rowsAffected);

                      Alert.alert('Inserido com sucesso! FK');
                    },
                    (_, error) => {
                      console.error('Erro ao adicionar registro:', error);
                      Alert.alert('Erro', 'Ocorreu um erro ao adicionar registro.2');
                    }
                  );

                },
                (_, error) => {
                  console.error('Erro ao adicionar registro:', error);
                  Alert.alert('Erro', 'Ocorreu um erro ao adicionar registro.1');
                }
              );
            },
            (_, error) => {
              console.error('Erro ao adicionar registro:', error);
              Alert.alert('Erro', 'Ocorreu um erro ao adicionar registro.0');
            }
          );
        }
      );
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.androidSafeArea}>
        <View style={styles.container}>
          <Text style={styles.title} >Cadastrar Usuário</Text>

          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Digite seu nome"
          />

          <TextInput
            style={styles.input}
            value={dataNasc}
            onChangeText={setDataNasc}
            placeholder="Digite sua data de nascimento"
          />

          <TextInput
            style={styles.input}
            value={numero}
            onChangeText={setNumero}
            placeholder="Digite o número do seu telefone"
          />

          <TextInput
            style={styles.input}
            value={tipo}
            onChangeText={setTipo}
            placeholder="Informe se é um telefone Fixo ou Celular"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={CadastrarRegistro}
          >
            <Text style={styles.textButton}>Salvar Registro</Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};


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
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerScroll: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    gap: 5
  },

  button: {
    borderRadius: 10,
    backgroundColor: "#873fda",
    height: 60,
    width: '90%',
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    elevation: 7,
    marginBottom: 13
  },

  textButton: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: 'bold'
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

  input: {
    width: '90%',
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    justifyContent: 'center',
  },

  buttonTable: {
    flexDirection: 'row',
    gap: 15
  }
});