import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, Text, TextInput, TouchableOpacity, Alert, View, ActivityIndicator } from 'react-native';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { TextInputMask } from 'react-native-masked-text';

import { registerUser, clearError } from '../../../redux/actions';

import commonStyles from '../commonStyles';

export default function AddContactForm({ navigation }) {
  const windowTitle = "Sign Up";
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);
  const error = useSelector(state => state.user.error);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [signUpRequested, setSignUpRequested] = useState(false);

  useEffect(() => {
    if (token) navigation.navigate("Main");
  }, [token]);

  useEffect(() => {
    if (error) {
      Alert.alert(windowTitle, error);
      dispatch(clearError());
      setSignUpRequested(false);
    }
  }, [error]);

  async function handleSubmit() {
    if (!username) return Alert.alert(windowTitle, "Please inform an username.");
    if (!password) return Alert.alert(windowTitle, "Please inform a password.");
    if (!repeatPassword) return Alert.alert(windowTitle, "Please repeat your password.");
    if (!name) return Alert.alert(windowTitle, "Please inform your name.");
    if (!phone) return Alert.alert(windowTitle, "Please inform your phone number.");
    if (!email) return Alert.alert(windowTitle, "Please inform your email.");
    
    if (username.length < 4) return Alert.alert(windowTitle, "Your username should be at least 4 characters long.");
    if (password.length < 8) return Alert.alert(windowTitle, "Your password should be at least 8 characters long");
    if (name.length < 4) return Alert.alert(windowTitle, "Your name should be at least 4 characters long");
    if (phone.length < 11) return Alert.alert(windowTitle, "Your phone number should be at least 11 characters long");
    if (email.length < 7) return Alert.alert(windowTitle, "Invalid email format");
    if (!email.includes("@")) return Alert.alert(windowTitle, "Invalid email format");

    if (password !== repeatPassword) return Alert.alert(windowTitle, "Passwords don't match.");

    const data = {
      username,
      password,
      name,
      phone,
      email,
      company,
    }
    
    dispatch(registerUser(data));
    setSignUpRequested(true);
  }

  return (
    <SafeAreaView style={commonStyles.formContainer}>
      <KeyboardAvoidingScrollView style={commonStyles.scrollView}>
        <Text style={commonStyles.inputLabel}>Username</Text>
        <TextInput
          style={commonStyles.input}
          autoCapitalize="none"
          autoCompleteType="username"
          maxLength={32}
          textContentType="username"
          value={username}
          onChangeText={setUsername}
          autoFocus
        />

        <Text style={commonStyles.inputLabel}>Password</Text>
        <TextInput
          style={commonStyles.input}
          autoCapitalize="none"
          autoCompleteType="password"
          maxLength={32}
          textContentType="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={commonStyles.inputLabel}>Repeat Password</Text>
        <TextInput
          style={commonStyles.input}
          autoCapitalize="none"
          autoCompleteType="password"
          maxLength={32}
          textContentType="password"
          value={repeatPassword}
          onChangeText={setRepeatPassword}
          secureTextEntry
        />

        <Text style={commonStyles.inputLabel}>Name</Text>
        <TextInput
          style={commonStyles.input}
          autoCapitalize="words"
          autoCompleteType="name"
          maxLength={32}
          textContentType="name"
          value={name}
          onChangeText={setName}
        />

        <Text style={commonStyles.inputLabel}>Phone</Text>
        <TextInputMask
          type="cel-phone"
          options={{
            maskType: "BRL",
            withDDD: true,
            dddMask: "(99) "
          }}
          value={phone}
          onChangeText={setPhone}
          style={commonStyles.input}
          autoCompleteType="tel"
          maxLength={17}
          keyboardType="numeric"
          textContentType="telephoneNumber"
        />

        <Text style={commonStyles.inputLabel}>Email</Text>
        <TextInput
          style={commonStyles.input}
          autoCompleteType="email"
          maxLength={32}
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={commonStyles.inputLabel}>Company</Text>
        <TextInput
          style={commonStyles.input}
          autoCapitalize="words"
          maxLength={32}
          textContentType="organizationName"
          value={company}
          onChangeText={setCompany}
        />

        { signUpRequested ? <View style={[commonStyles.submitButton, commonStyles.disabledButton]}>
                              <ActivityIndicator size="small" color="#000" />
                            </View>
                          : <TouchableOpacity style={commonStyles.submitButton} onPress={handleSubmit}>
                              <Text style={commonStyles.whiteText}>Enviar</Text>
                            </TouchableOpacity>
        }
      </KeyboardAvoidingScrollView>
    </SafeAreaView>
  );
}