import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';

import commonStyles from '../commonStyles';

export default function AddContactForm() {
  const [phoneNumber, setPhoneNumber] = useState("");

  function handlePhoneNumber(number) {
    return `(${number.substring(0,2)}) ${number.substring(2,5)}-${number.substring(5,8)}-${number.substring(8)}`;
  }

  return (
    <SafeAreaView style={commonStyles.formContainer}>
      <ScrollView style={commonStyles.scrollView}>
        <Text style={commonStyles.inputLabel}>Name</Text>
        <TextInput
          style={commonStyles.input}
          autoCapitalize="words"
          autoCompleteType="name"
          maxLength={32}
          textContentType="name"
          autoFocus
        />

        <Text style={commonStyles.inputLabel}>Phone</Text>
        <TextInput
          style={commonStyles.input}
          autoCompleteType="tel"
          maxLength={17}
          keyboardType="numeric"
          textContentType="telephoneNumber"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
        />

        <Text style={commonStyles.inputLabel}>Email</Text>
        <TextInput
          style={commonStyles.input}
          autoCompleteType="email"
          maxLength={32}
          keyboardType="email-address"
          textContentType="emailAddress"
        />

        <Text style={commonStyles.inputLabel}>Address</Text>
        <TextInput
          style={commonStyles.input}
          autoCompleteType="street-address"
          maxLength={64}
          textContentType="streetAddressLine1"
        />

        <Text style={commonStyles.inputLabel}>City</Text>
        <TextInput
          style={commonStyles.input}
          maxLength={32}
          textContentType="addressCity"
        />

        <Text style={commonStyles.inputLabel}>State</Text>
        <TextInput
          style={commonStyles.input}
          maxLength={32}
          textContentType="addressState"
        />

        <Text style={commonStyles.inputLabel}>Country</Text>
        <TextInput
          style={commonStyles.input}
          maxLength={32}
          textContentType="countryName"
        />

        <Text style={commonStyles.inputLabel}>Birthday</Text>
        <TextInput
          style={commonStyles.input}
          maxLength={10}
          keyboardType="numeric"
        />

        <Text style={commonStyles.inputLabel}>Company</Text>
        <TextInput
          style={commonStyles.input}
          maxLength={32}
          textContentType="organizationName"
        />

        <Text style={commonStyles.inputLabel}>Nationality</Text>
        <TextInput
          style={commonStyles.input}
          maxLength={32}
        />

        <TouchableOpacity style={commonStyles.submitButton}><Text style={commonStyles.whiteText}>Enviar</Text></TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}