import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Button, ScrollView, Text, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './ChatAppStyles'; 

const ChatApp = () => { 
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();
  const route = useRoute(); 
  const navigation = useNavigation(); 

  useEffect(() => {
    if (route.params?.initialMessage) {
      const initialMessages = [
        { text: route.params.initialMessage, type: 'support' }
      ];
      setMessages(initialMessages);
    } else {
      const initialMessages = [
        { text: "Welcome! How can I assist you today?", type: 'support' },
        { text: "1. Current Fees\n2. Missing Result\n3. Email Problem\n4. Directions\n5. Faculties Chairpersons", type: 'support' },
      ];
      setMessages(initialMessages);
    }
  }, [route.params?.initialMessage]);

  const sendMessage = async () => {
    if (message.trim()) {
      const newMessages = [...messages, { text: message, type: 'user' }];
      setMessages(newMessages);
      
      try {
        const response = await fetch('http://localhost:3000/api/bot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          Alert.alert('Error', errorData.message);
          return;
        }

        const data = await response.json();
        const supportMessage = { text: data.reply, type: 'support' };
        setMessages(prevMessages => [...prevMessages, supportMessage]);
        scrollToBottom();
      } catch (error) {
        Alert.alert('Error', 'There was a problem with your request.');
        console.error(error);
      }

      setMessage('');
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  const handleBack = () => {
    if (messages.length === 0) {
      navigation.goBack();
    } else {
      const initialMessages = [
        { text: "Choose the option for the query you want to be assisted on:", type: 'support' },
        { text: '1. Current Fees\n2. Missing Result\n3. Email Problem\n4. Directions\n5. Faculties Chairpersons', type: 'support' }
      ];
      setMessages(initialMessages);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messages} ref={scrollViewRef}>
        {messages.map((msg, index) => (
          <Text key={index} style={[styles.message, msg.type === 'user' ? styles.user : styles.support]}>
            {msg.text}
          </Text>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Type your enquiry..."
        onSubmitEditing={sendMessage} 
      />
      <View style={styles.buttonContainer}>
        {message.trim() !== '' && (
          <Button title="Send" onPress={sendMessage} />
        )}
        <Button title="Back" onPress={handleBack} />
      </View>
    </View>
  );
};

export default ChatApp;