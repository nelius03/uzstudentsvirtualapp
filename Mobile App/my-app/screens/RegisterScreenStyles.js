import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e6f2ff', 
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2c3e50', 
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#3498db', 
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleForm: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleText: {
    marginRight: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default styles;
