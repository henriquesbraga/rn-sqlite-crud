import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators  } from '@react-navigation/stack';

import HomeScreen from './pages/HomeScreen';
import RegisterUser from './pages/RegisterUser';
import UpdateUser from './pages/UpdateUser';
import ViewUser from './pages/ViewUser';
import ViewAllUser from './pages/ViewAllUser';
import DeleteUser from './pages/DeleteUser';

const Stack = createStackNavigator();



const App = () =>{
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}>

        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="RegisterUser" component={RegisterUser}/>
        <Stack.Screen name="Update" component={UpdateUser}/>
        <Stack.Screen name="View" component={ViewUser}/>
        <Stack.Screen name="ViewAll" component={ViewAllUser}/>
        <Stack.Screen name="Delete" component={DeleteUser}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
