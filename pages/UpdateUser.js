import React, { Component } from 'react';
import { View, YellowBox, ScrollView, KeyboardAvoidingView, Alert, } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });


class UpdateUser extends Component {
    constructor(props){
        super(props);
        this.state ={
            input_user_id: '',
            user_name: '',
            user_contact: '',
            user_address: '',
        };
    };//fim do construtor

    searchUser = () =>{
        const {input_user_id} = this.state;
        db.transaction((tx) =>{
            tx.executeSql(
                'SELECT * FROM table_user where user_id = ?',
                [input_user_id],
                (tx, results) => {
                    var resps = results.rows.length;
                    if(resps > 0) {
                        this.setState({
                            user_name:results.rows.item(0).user_name,
                           });
                           this.setState({
                            user_contact:results.rows.item(0).user_contact,
                           });
                           this.setState({
                            user_address:results.rows.item(0).user_address,
                        });
                    }
                    else {
                        alert('Usuário não encontrado!');
                        this.setState({
                            user_name:'',
                            user_contact:'',
                            user_address:'',
                        });
                    }
                }//fim da arrow function com a resposta
            );//fim tx.executeSql
        });//fim db.transaction
    }//fim do searchUser

    updateUser = () =>{
        var that = this;
        const { input_user_id } = this.state;
        const { user_name } = this.state;
        const { user_contact } = this.state;
        const { user_address } = this.state;

        if(user_name){
            if(user_contact){
                if(user_address){
                    db.transaction((tx) => {
                        tx.executeSql(
                            'UPDATE table_user set user_name=?, user_contact=? , user_address=? where user_id=?',
                            [user_name, user_contact, user_address, input_user_id],
                            (tx, results) => {
                                if(results.rowsAffected > 0){
                                    Alert.alert( 'Successo', 'Usuário atualizado com sucesso!',
                                    [
                                        {text: 'Ok', onPress: () => that.props.navigation.navigate('HomeScreen')},
                                    ],
                                    { cancelable: false }
                                    );   
                                }
                                else{
                                    alert('Falha ao atualizar!')
                                }
                            }//fim da arrow function com respostas
                        );//fim tx.executeSql
                    });//fim db.transaction
                }
                else{
                    alert('Preencha o email!');
                }
            }
            else{
                alert('Preencha o numero!'); 
            }
        }
        else{
            alert('Preencha o nome!');
        }
    }
    
    render (){
        return(
            <View style={{ backgroundColor: '#F0F8FF', flex: 1, paddingTop: 50 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
            <Mytextinput
              placeholder="ID do usuário"
              style={{ padding:10 }}
              onChangeText={input_user_id => this.setState({ input_user_id })}
            />
            <Mybutton
              title="Buscar Usuário"
              customClick={this.searchUser.bind(this)}
            />
            <Mytextinput
              placeholder="Nome"
              value={this.state.user_name}
              style={{ padding:10 }}
              onChangeText={user_name => this.setState({ user_name })}
            />
            <Mytextinput
              placeholder="Telefone"
              value={''+ this.state.user_contact}
              onChangeText={user_contact => this.setState({ user_contact })}
              maxLength={10}
              style={{ padding:10 }}
              keyboardType="numeric"
            />
            <Mytextinput
              value={this.state.user_address}
              placeholder="Endereço"
              onChangeText={user_address => this.setState({ user_address })}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{textAlignVertical : 'top', padding:10}}
            />
            <Mybutton
              title="Atualizar Usuário"
              customClick={this.updateUser.bind(this)}
            />

            <Mybutton
                title="Voltar a Home"
                customClick={() => this.props.navigation.goBack()}
            />

          </KeyboardAvoidingView>
        </ScrollView>
      </View>
        );//fim do return
    }//fim do render
}//fim da classe

export default UpdateUser;