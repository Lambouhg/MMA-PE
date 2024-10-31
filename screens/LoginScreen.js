// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { TextInput, Button, Text, Appbar } from 'react-native-paper';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { MaterialIcons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('RoomList');
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://example.com/background.jpg' }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.Content title="Welcome Back!" titleStyle={styles.title} />
        </Appbar.Header>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          mode="outlined"
          left={<TextInput.Icon icon={() => <MaterialIcons name="email" size={20} />} />}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          mode="outlined"
          left={<TextInput.Icon icon={() => <MaterialIcons name="lock" size={20} />} />}
        />
        <Button mode="contained" onPress={handleLogin} style={styles.loginButton} labelStyle={styles.buttonText}>
          Login
        </Button>
        <Button mode="text" onPress={() => navigation.navigate('Register')} style={styles.registerButton}>
          Don't have an account? Register
        </Button>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    marginHorizontal: 16,
  },
  appbar: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#6200ea',
  },
  input: {
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 16,
    borderRadius: 25,
    paddingVertical: 8,
    backgroundColor: '#6200ea',
    shadowColor: '#6200ea',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  registerButton: {
    marginTop: 16,
    textAlign: 'center',
    fontWeight: '600',
    color: '#6200ea',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
