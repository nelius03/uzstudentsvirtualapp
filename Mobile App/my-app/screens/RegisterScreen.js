// RegisterScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import styles from './RegisterScreenStyles'; 

const RegisterScreen = ({ navigation, route }) => {
  const { setUsers } = route.params; 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  };

  const handleRegister = async () => {
      if (!username || !email || !password) {
          Alert.alert('Error', 'All fields are required.');
          return;
      }

      if (!validateEmail(email)) {
          Alert.alert('Error', 'Please enter a valid email address.');
          return;
      }

      // Create request body
      const requestBody = {
          username,
          email,
          password
      };

      try {
          const response = await fetch('http://localhost:3000/register', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestBody),
          });

          if (!response.ok) {
              const errorData = await response.json();
              Alert.alert('Registration Failed', errorData.message);
              return;
          }

          // Update local state if registration is successful
          setUsers(prevUsers => [...prevUsers, { username, email, password }]);
          Alert.alert('Registration Successful', 'You can now log in.');
          navigation.navigate('LoginScreen');

      } catch (error) {
          Alert.alert('Error', 'There was a problem with your request.');
          console.error(error);
      }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;