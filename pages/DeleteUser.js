import React, { Component } from 'react';
import { Button, Text, View, Alert } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });

class DeleteUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            input_user_id: '',
        };
    }//fim do construtor

    deleteUser = () =>{
        var that = this;
        const { input_user_id } = this.state;
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM table_user WHERE user_id = ?',
                [input_user_id],
                (tx, results) =>{
                    if(results.rowsAffected > 0 ){
                        Alert.alert(
                            'Sucesso!',
                            'Usuário deletado com sucesso!',
                            [
                                {
                                text: 'OK',
                                onPress: () => that.props.navigation.navigate('Home'),
                                },
                            ],
                            {cancelable: false }
                        );
                    }
                    else {
                        alert('Insira um Id válido!');
                    }
                }//fim arrow com results
            )
        });//fim db.transaction
    }//fim deleteUser

    render(){
        return(
            <View style={{ backgroundColor: '#F0F8FF', flex: 1 }}>
                <Mytextinput
                placeholder="ID do Usuário"
                onChangeText={input_user_id => this.setState({ input_user_id })}
                style={{ padding:10 }}
                />
                <Mybutton
                title="Deletar Usuário"
                customClick={this.deleteUser.bind(this)}
                />

                <Mybutton
                title="Voltar a Home"
                customClick={() => this.props.navigation.goBack()}
                />
            </View>
        );//fim do return
    }//fim do render
}   
export default DeleteUser;