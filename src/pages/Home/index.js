import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, TouchableOpacity, Image } from 'react-native';
// import { getStatusBarHeight } from 'react-native-status-bar-height';
import { DatabaseConnection } from '../../database/database'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'

// Abra ou crie o banco de dados SQLite
const db = new DatabaseConnection.getConnection;

export default function Home() {

    const navigation = useNavigation();

    function ExibirRegistros() {
        navigation.navigate('ExibirRegistros')
    }

    function CadastrarRegistro() {
        navigation.navigate('CadastrarRegistro')
    }

    function EditarRegistro() {
        navigation.navigate('EditarRegistro')
    }

    function PesquisarRegistro() {
        navigation.navigate('PesquisarRegistro')
    }


    // Função dentro do useEffect que cria a tabela caso ela não exista

    // Tabela clientes

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS tbl_clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, data_nasc DATE NOT NULL, data DEFAULT (STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW', 'localtime')))",
                [], //[]: Este é o array de parâmetros. Como não estamos usando nenhum parâmetro na consulta SQL, deixamos esse array vazio.
                () => console.log('Tabela criada com sucesso'),//retorno de  sucesso
                // '_' É um parâmetro que representa o resultado da transação SQL, por convenção utiliza-se o underscore. para indicar que estamos ignorando esse valor.
                (_, error) => console.error(error) //retorno de  erro
            );

            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS tbl_telefones (id INTEGER PRIMARY KEY AUTOINCREMENT, numero TEXT NOT NULL, tipo text NOT NULL, data DEFAULT (STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW', 'localtime')))",
                [], //[]: Este é o array de parâmetros. Como não estamos usando nenhum parâmetro na consulta SQL, deixamos esse array vazio.
                () => console.log('Tabela criada com sucesso'),//retorno de  sucesso
                // '_' É um parâmetro que representa o resultado da transação SQL, por convenção utiliza-se o underscore. para indicar que estamos ignorando esse valor.
                (_, error) => console.error(error) //retorno de  erro
            );

            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS clientes_has_telefones ( id_clientes INT NOT NULL, id_telefones INT NOT NULL, FOREIGN KEY(id_clientes) REFERENCES tbl_clientes(id), FOREIGN KEY(id_telefones) REFERENCES tbl_telefones(id))",
                [], //[]: Este é o array de parâmetros. Como não estamos usando nenhum parâmetro na consulta SQL, deixamos esse array vazio.
                () => console.log('Tabela criada com sucesso'),//retorno de  sucesso
                // '_' É um parâmetro que representa o resultado da transação SQL, por convenção utiliza-se o underscore. para indicar que estamos ignorando esse valor.
                (_, error) => console.error(error) //retorno de  erro
            );

            // Deletar tabela clientes
            // tx.executeSql(
            //     "DROP TABLE clientes_has_telefones",
            //     [], //[]: Este é o array de parâmetros. Como não estamos usando nenhum parâmetro na consulta SQL, deixamos esse array vazio.
            //     () => console.log('Tabela deletada com sucesso'),//retorno de  sucesso
            //     // '_' É um parâmetro que representa o resultado da transação SQL, por convenção utiliza-se o underscore. para indicar que estamos ignorando esse valor.
            //     (_, error) => console.error(error) //retorno de  erro
            // );
        });
    }, []);

    // Tabela innerJoin

    //     db.transaction(tx => {
    //         tx.executeSql(
    //             "SELECT tbl_clientes.nome, tbl_clientes.data_nasc, tbl_telefones.numero, tbl_telefones.tipo FROM tbl_clientesJOIN tbl_telefones ON tbl_clientes.id_cliente = tbl_telefones.id_cliente",
    //             [], //[]: Este é o array de parâmetros. Como não estamos usando nenhum parâmetro na consulta SQL, deixamos esse array vazio.
    //             () => console.log('Tabela criada com sucesso'),//retorno de  sucesso
    //             // '_' É um parâmetro que representa o resultado da transação SQL, por convenção utiliza-se o underscore. para indicar que estamos ignorando esse valor.
    //             (_, error) => console.error(error) //retorno de  erro
    //         );
    //     });
    // }, []);

    return (
        <SafeAreaProvider>

            <SafeAreaView style={styles.androidSafeArea}>
                <View style={styles.container}>
                    <Text style={styles.title}>Página Inicial</Text>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={CadastrarRegistro}
                    >
                        <Text style={styles.textButton}>Cadastrar Usuário</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={ExibirRegistros}
                    >
                        <Text style={styles.textButton}>Exibir Registros</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                    // onPress={EditarRegistro}
                    >
                        <Text style={styles.textButton}>Editar Registro</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                    onPress={PesquisarRegistro}
                    >
                        <Text style={styles.textButton}>Pesquisar Registro</Text>
                    </TouchableOpacity>

                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        // paddingTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
        marginTop: 10,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
        padding: 15,
        gap: 10
    },
    alinharEmLinha: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 15,
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
        marginBottom: 35,
    },

    buttonTable: {
        flexDirection: 'row',
        gap: 15
    }
});