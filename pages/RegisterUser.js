import React, { Component } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });

class RegisterUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            user_name: '',
            user_contact: '',
            user_address: '',
        }// fim do state
    }//fim do construtor

    register_user = () => {
        var that = this;
        const { user_name } = this.state; //Desestruturação 
        const { user_contact } = this.state;
        const { user_address } = this.state;

        if(user_name){
            if(user_contact){
                if(user_address){
                    db.transaction((tx) => {
                        tx.executeSql(
                            'INSERT INTO table_user (user_name, user_contact, user_address) VALUES (?,?,?)',
                            [user_name, user_contact, user_address],
                            (tx, res) =>{
                                if(res.rowsAffected > 0){
                                    Alert.alert(
                                        'Sucesso!',
                                        'Registrado com sucesso!',
                                        [
                                            {
                                                text: 'Ok',
                                                onPress: () =>
                                                  that.props.navigation.navigate('Home'),
                                              },
                                        ],//fim do vetor com informações
                                        { cancelable: false }
                                    );//fim alert
                                }//fim if
                                else {
                                    alert('Registro Falhou!');
                                }
                            }//fim da arrow function com a resposta
                        );//fim tx.executeSql
                    });//fim db.transaction
                }
                else{
                    alert('Preencha o endereço!');
                }
            }
            else{
                alert('Preencha o numero!');
            }
        }
        else{
            alert('Preencha o nome!');
        }
    }//fim do register user

    render(){
        return (
            <View style={{ backgroundColor: '#F0F8FF', flex: 1, paddingTop: 100 }}>
              <ScrollView keyboardShouldPersistTaps="handled">
                <KeyboardAvoidingView
                  behavior="padding"
                  style={{ flex: 1, justifyContent: 'space-between' }}>
                  <Mytextinput
                    placeholder="Nome"
                    onChangeText={user_name => this.setState({ user_name })}
                    style={{ padding:10 }}
                  />
                  <Mytextinput
                    placeholder="Telefone"
                    onChangeText={user_contact => this.setState({ user_contact })}
                    maxLength={10}
                    keyboardType="numeric"
                    style={{ padding:10 }}
                  />
                  <Mytextinput
                    placeholder="Endereço"
                    onChangeText={user_address => this.setState({ user_address })}
                    maxLength={225}
                    numberOfLines={5}
                    multiline={true}
                    style={{ textAlignVertical: 'top',padding:10 }}
                  />
                  <Mybutton
                    title="Registrar"
                    customClick={this.register_user.bind(this)}
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
export default RegisterUser;