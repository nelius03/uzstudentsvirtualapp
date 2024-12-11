// App.js

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './screens/LandingPage'; 
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ChatApp from './screens/ChatApp';

const Stack = createStackNavigator();

const App = () => {
  const [users, setUsers] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="LoginScreen">
          {props => <LoginScreen {...props} route={{ params: { users, setUsers } }} />}
        </Stack.Screen>
        <Stack.Screen name="RegisterScreen">
          {props => <RegisterScreen {...props} route={{ params: { setUsers } }} />}
        </Stack.Screen>
        <Stack.Screen name="ChatApp" component={ChatApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;