import React, { useState, useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, Text, View, Alert, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { TextInputMask } from 'react-native-masked-text';

import commonStyles from '../commonStyles';
import styles from './styles';

import { changeUserInfo, clearUserInfoChangeResponse, clearError } from '../../../redux/actions';

export default function ChangeInformationsForm({ navigation }) {
  const windowTitle = "Update informations";
  const dispatch = useDispatch();

  const response = useSelector(state => state.user.changeInfoResponse);
  const id = useSelector(state => state.user.id);
  const token = useSelector(state => state.user.token);
  const error = useSelector(state => state.user.error);
  const oldName = useSelector(state => state.user.name);
  const oldPhone = useSelector(state => state.user.phone);
  const oldCell = useSelector(state => state.user.cell);
  const oldEmail = useSelector(state => state.user.email);
  const oldAddress = useSelector(state => state.user.address);
  const oldCity = useSelector(state => state.user.city);
  const oldState = useSelector(state => state.user.state);
  const oldCountry = useSelector(state => state.user.country);
  const oldBirthday = useSelector(state => state.user.birthday);
  const oldCompany = useSelector(state => state.user.company);
  const oldNationality = useSelector(state => state.user.nationality);

  const [name, setName] = useState(oldName);
  const [phone, setPhone] = useState(oldPhone);
  const [cell, setCell] = useState(oldCell);
  const [email, setEmail] = useState(oldEmail);
  const [address, setAddress] = useState(oldAddress);
  const [city, setCity] = useState(oldCity);
  const [state, setState] = useState(oldState);
  const [country, setCountry] = useState(oldCountry);
  const [birthday, setBirthday] = useState(oldBirthday);
  const [company, setCompany] = useState(oldCompany);
  const [nationality, setNationality] = useState(oldNationality);

  const [changeRequested, setChangeRequested] = useState(false);

  useEffect(() => {
    if (!token) navigation.navigate("Login");
  }, [token]);

  useEffect(() => {
    if (error) {
      Alert.alert(windowTitle, error);
      dispatch(clearError());
      setChangeRequested(false);
    }
  }, [error]);

  useEffect(() => {
    if (response) {
      Alert.alert(windowTitle, "Informations updated successfully.");
      dispatch(clearUserInfoChangeResponse());
      setChangeRequested(false);
    }
  }, [response]);

  async function handleSubmit() {
    if (name.length < 4) return Alert.alert(windowTitle, "Your username should be at least 4 characters long.");
    if (phone.length < 11) return Alert.alert(windowTitle, "Your phone number should be at least 11 characters long");
    if (email.length < 7) return Alert.alert(windowTitle, "Invalid email format");
    if (!email.includes("@")) return Alert.alert(windowTitle, "Invalid email format");

    const data = {
      id,
      token
    };

    if (name !== oldName) data.name = name;
    if (phone !== oldPhone) data.phone = phone;
    if (cell !== oldCell) data.cell = cell;
    if (email !== oldEmail) data.email = email;
    if (address !== oldAddress) data.address = address;
    if (city !== oldCity) data.city = city;
    if (state !== oldState) data.state = state;
    if (country !== oldCountry) data.country = country;
    if (birthday !== oldBirthday) data.birthday = birthday;
    if (company !== oldCompany) data.company = company;
    if (nationality !== oldNationality) data.nationality = nationality;

    dispatch(changeUserInfo(data));
    setChangeRequested(true);
  }

  return (
    <SafeAreaView style={styles.formContainer}>
      <KeyboardAvoidingScrollView style={commonStyles.scrollView}>
        <View style={styles.titleContainer}>
          <Text style={commonStyles.title}>Update profile</Text>
        </View>

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
          style={commonStyles.input}
          autoCompleteType="tel"
          maxLength={17}
          textContentType="telephoneNumber"
          value={phone}
          onChangeText={setPhone}
        />

        <Text style={commonStyles.inputLabel}>Celphone</Text>
        <TextInputMask
          type="cel-phone"
          options={{
            maskType: "BRL",
            withDDD: true,
            dddMask: "(99) "
          }}
          style={commonStyles.input}
          autoCompleteType="tel"
          maxLength={17}
          textContentType="telephoneNumber"
          value={cell}
          onChangeText={setCell}
        />

        <Text style={commonStyles.inputLabel}>Email</Text>
        <TextInput
          style={commonStyles.input}
          autoCapitalize="words"
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
        <TextInputMask
          type="datetime"
          options={{
            format: "DD/MM/YYYY"
          }}
          value={birthday}
          onChangeText={setBirthday}
          style={commonStyles.input}
          keyboardType="numeric"
          maxLength={10}
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

        { changeRequested ? <View style={[commonStyles.submitButton, commonStyles.disabledButton]}>
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