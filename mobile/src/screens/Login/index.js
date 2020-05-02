import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

import { logInUser, clearError } from '../../../redux/actions';

import styles from './styles';

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginRequested, setLoginRequested] = useState(false);
  const token = useSelector(state => state.user.token);
  const error = useSelector(state => state.user.error);
  const dispatch = useDispatch();

  async function login() {
    if (!username) return Alert.alert("Login", "Please inform your username.");
    if (!password) return Alert.alert("Login", "Please inform your password.");
    if (username.length < 4) return Alert.alert("Login", "Your username should be at least 4 characters long.");
    if (password.length < 8) return Alert.alert("Login", "Your password should be at least 8 characters long.");
    
    dispatch(logInUser(username, password));
    setLoginRequested(true);
  }

  useEffect(() => {
    if (token) navigation.navigate("Main");
  }, [token]);

  useEffect(() => {
    if (error) {
      Alert.alert("Login", error);
      dispatch(clearError());
      setLoginRequested(false);
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <View style={styles.titleArea}>
        <Text style={styles.title}>ContactsApp</Text>
      </View>
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input} 
          value={username}
          placeholder="Username"
          placeholderTextColor="#FFF"
          onChangeText={setUsername}
          maxLength={32}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Password"
          placeholderTextColor="#FFF"
          onChangeText={setPassword}
          maxLength={32}
          autoCapitalize="none"
          secureTextEntry
        />
        {(!loginRequested) ? <TouchableOpacity
                              style={styles.logIn}
                              onPress={login}
                            >
                              <Text style={styles.logInText}>Log In</Text>
                            </TouchableOpacity>
                          : <View style={[styles.logIn, styles.disabledLogin]}>
                              <ActivityIndicator size="small" color="#000" />
                            </View>
        }
      </View>
      <View style={styles.createAccountArea}>
        <TouchableOpacity style={styles.createAccountArea} onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.dontHaveAnAccount}>Don't have an account?</Text>
          <Text style={styles.signUp}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};