import React, { Component }from 'react';
import { View, StyleSheet } from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });

class HomeScreen extends Component {
    constructor(props){
        super(props);
        db.transaction((txn) =>{
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
                [],
                (txn, res) =>{
                    if(res.rows.length == 0){
                        txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
                            []
                        );//fim do txn que cria a tabela
                    }//fim do if
                }// fim arrow function com a resposta
            );// fim txn.executeSql
        });// fim db.transaction
    }// fim do construtor

    render(){
        return(<View
            style={{
              flex: 1,
              backgroundColor: '#F0F8FF',
              flexDirection: 'column',
              paddingTop: 100
            }}>
            <Mytext text="SQLite CRUD" />
            
            <Mybutton
              title="Registrar"
              customClick={() => this.props.navigation.navigate('RegisterUser')}
            />
            <Mybutton
              title="Atualizar"
              customClick={() => this.props.navigation.navigate('Update')}
            />
            <Mybutton
              title="Consultar"
              customClick={() => this.props.navigation.navigate('View')}
            />
            <Mybutton
              title="Ver todos"
              customClick={() => this.props.navigation.navigate('ViewAll')}
            />
            <Mybutton
              title="Deletar"
              customClick={() => this.props.navigation.navigate('Delete')}
            />
          </View>);//fim render return
    }
}// fim da classe



export default HomeScreen;