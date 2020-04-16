import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import styles from './styles';

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.titleArea}>
        <Text style={styles.title}>Login</Text>
      </View>
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input} 
          value={username}
          placeholder="Email"
          placeholderTextColor="#FFF"
          onChangeText={setUsername}
          maxLength={32}
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Password"
          placeholderTextColor="#FFF"
          onChangeText={setPassword}
          maxLength={32}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.logIn}
          onPress={() => navigation.navigate("Main")}
        >
          <Text style={styles.logInText}>Log In</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.createAccountArea}>
        <TouchableOpacity style={styles.createAccountArea}>
          <Text style={styles.dontHaveAnAccount}>Don't have an account?</Text>
          <Text style={styles.signUp}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};