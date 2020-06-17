import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' }); 

class ViewAllUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            FlatListItems: [],
        };
        db.transaction((tx) =>{
            tx.executeSql('SELECT * FROM table_user', [], (tx, results) =>{
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i){
                    temp.push(results.rows.item(i));
                }
                this.setState({
                    FlatListItems: temp,
                });
            });
        });//fim db.transaction
    }//fim do construtor

    ListViewItemSeparator = () => {
        return (
          <View style={{
              height: 1, 
              width: "100%",
              backgroundColor: "#CEDCCE",
            }}
          />
        );
      };
    
    render(){
        return(
            <View>
                <FlatList 
                    data={this.state.FlatListItems}
                    ItemSeparatorComponent={this.ListViewItemSeparator}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                <View key={item.user_id} style={{ backgroundColor: '#F0F8FF', padding: 20}}>
                <Text>ID: {item.user_id}</Text>
                <Text>None: {item.user_name}</Text>
                <Text>Telefone: {item.user_contact}</Text>
                <Text>Endereço: {item.user_address}</Text>
                
                </View>
                    )}
                />
                    
            </View>
      
        );//fim return
    }//fim render
}//fim da classe

export default ViewAllUser;