// LoginScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import styles from './LoginScreenStyles';

const LoginScreen = ({ route }) => {
  const { users } = route.params; 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
      
      const requestBody = {
          username,
          password,
      };

      try {
          const response = await fetch('http://localhost:3000/api/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestBody),
          });

          if (!response.ok) {
              const errorData = await response.json();
              Alert.alert('Login Failed', errorData.message);
              return;
          }

          const data = await response.json();
          Alert.alert('Login Successful', `Welcome, ${data.username}!`);
          navigation.navigate('ChatApp'); 

      } catch (error) {
          Alert.alert('Error', 'There was a problem with your request.');
          console.error(error);
      }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterScreen', { setUsers: route.params.setUsers })}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;