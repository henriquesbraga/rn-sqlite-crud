import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' }); 

class ViewUser extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            input_user_id: '',
            userData: '',
        };
    }//fim do construtor

    searchUser = () =>{
        const { input_user_id } = this.state;
        db.transaction((tx)=>{
            tx.executeSql(
                'SELECT * FROM table_user where user_id = ?',
                [input_user_id],
                (tx, results) =>{
                    var resps = results.rows.length;
                    if(resps > 0){
                        this.setState({
                            userData: results.rows.item(0)
                        });
                    }
                    else{
                        alert('Usuário não encontrado');
                        this.setState({ userData: ''});
                    }
                }//fim arrow function com respostas
            );//fim tx.executeSql
        });//fim db.transaction
    };//fim searchUser

    render(){
        return(
        <View style={{paddingTop: 100, backgroundColor: '#F0F8FF'}}>
            <Mytextinput
            placeholder="ID do Usuário"
            onChangeText={input_user_id => this.setState({ input_user_id })}
            style={{ padding:10 }}
            />
            <Mybutton
            title="Buscar Usuário"
            customClick={this.searchUser.bind(this)}
            />
            <View style={{ marginLeft: 35, marginRight: 35, marginTop: 10 }}>
            <Text>ID : {this.state.userData.user_id}</Text>
            <Text>Nome: {this.state.userData.user_name}</Text>
            <Text>Telefone: {this.state.userData.user_contact}</Text>
            <Text>Endereço: {this.state.userData.user_address}</Text>
            </View>

            <Mybutton
                title="Voltar a Home"
                customClick={() => this.props.navigation.goBack()}
            />

      </View>
        )//fim return
    }//fim render
}//fim da classe

export default ViewUser;