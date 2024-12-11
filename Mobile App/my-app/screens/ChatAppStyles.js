import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5ddd5', 
    padding: 20,
  },
  messages: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },
  message: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 15, 
    maxWidth: '75%', 
  },
  user: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
    color: '#000',
  },
  support: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff', 
    color: '#000', 
  },
  input: {
    alignItems: 'center',
    height: 50, 
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25, 
    paddingHorizontal: 15,
    width: '80%', 
    marginTop: 10,
    backgroundColor: '#ffffff', 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    color: '#ffffff', 
  },
  logoutButton: {
    backgroundColor: '#dc3545', 
    color: '#ffffff', 
  },
  buttonText: {
    borderRadius: 20,
    color: '#ffffff', 
    fontWeight: 'bold', 
  },
});

export default styles;