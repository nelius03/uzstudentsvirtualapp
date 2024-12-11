import React from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './LandingPageStyles';

const LandingPage = () => {
  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpg')} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to ChatApp.. Your University Virtual Assistant!!</Text>
        <Text style={styles.subtitle}>For all your queries you don't need to be on Campus. We are here to assist you in the comfort of your home.</Text>

        <View style={styles.feature}>
          <Text style={styles.featureTitle}>Features:</Text>
          <Text style={styles.featureDescription}>- Get instant help</Text>
          <Text style={styles.featureDescription}>- Easy to use</Text>
          <Text style={styles.featureDescription}>- Quick responses</Text>
          <Text style={styles.featureDescription}>- Save your money</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
          <Text style={styles.buttonText}>CLICK TO START</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LandingPage;
