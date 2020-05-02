import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

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
  const [cell, setCell] = useState("");
  const picture = "";
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [birthday, setBirthday] = useState("");
  const [company, setCompany] = useState("");
  const [nationality, setNationality] = useState("");

  useEffect(() => {
    if (token) navigation.navigate("Main");
  }, [token]);

  useEffect(() => {
    if (error) {
      Alert.alert(windowTitle, error);
      dispatch(clearError());
    }
  }, [error]);

  function handlePhoneNumber(number) {
    return `(${number.substring(0,2)}) ${number.substring(2,5)}-${number.substring(5,8)}-${number.substring(8)}`;
  }

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

    const userInfo = {
      username,
      password,
      name,
      phone,
      cell,
      picture,
      email,
      address,
      city,
      state,
      country,
      birthday,
      company,
      nationality
    };

    dispatch(registerUser(userInfo));
  }

  return (
    <SafeAreaView style={commonStyles.formContainer}>
      <ScrollView style={commonStyles.scrollView}>
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
        <TextInput
          style={commonStyles.input}
          autoCompleteType="tel"
          maxLength={17}
          keyboardType="numeric"
          textContentType="telephoneNumber"
          onChangeText={setPhone}
          value={phone}
        />

        <Text style={commonStyles.inputLabel}>Cell</Text>
        <TextInput
          style={commonStyles.input}
          autoCompleteType="tel"
          maxLength={17}
          keyboardType="numeric"
          textContentType="telephoneNumber"
          onChangeText={setCell}
          value={cell}
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

        <Text style={commonStyles.inputLabel}>Address</Text>
        <TextInput
          style={commonStyles.input}
          autoCapitalize="words"
          autoCompleteType="street-address"
          maxLength={64}
          textContentType="streetAddressLine1"
          value={address}
          onChangeText={setAddress}
        />

        <Text style={commonStyles.inputLabel}>City</Text>
        <TextInput
          style={commonStyles.input}
          autoCapitalize="words"
          maxLength={32}
          textContentType="addressCity"
          value={city}
          onChangeText={setCity}
        />

        <Text style={commonStyles.inputLabel}>State</Text>
        <TextInput
          style={commonStyles.input}
          autoCapitalize="words"
          maxLength={32}
          textContentType="addressState"
          value={state}
          onChangeText={setState}
        />

        <Text style={commonStyles.inputLabel}>Country</Text>
        <TextInput
          style={commonStyles.input}
          autoCapitalize="words"
          maxLength={32}
          textContentType="countryName"
          value={country}
          onChangeText={setCountry}
        />

        <Text style={commonStyles.inputLabel}>Birthday</Text>
        <TextInput
          style={commonStyles.input}
          maxLength={10}
          keyboardType="numeric"
          value={birthday}
          onChangeText={setBirthday}
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

        <Text style={commonStyles.inputLabel}>Nationality</Text>
        <TextInput
          style={commonStyles.input}
          maxLength={32}
          value={nationality}
          onChangeText={setNationality}
        />

        <TouchableOpacity style={commonStyles.submitButton} onPress={handleSubmit}>
          <Text style={commonStyles.whiteText}>Enviar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}