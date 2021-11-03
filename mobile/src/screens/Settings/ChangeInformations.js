import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, Alert, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { TextInputMask } from 'react-native-masked-text';

import commonStyles from '../commonStyles';

export default function ChangeInformationsForm({ navigation }) {
  const windowTitle = "Update informations";
  const dispatch = useDispatch();

  const id = useSelector(state => state.user.id);
  const token = useSelector(state => state.user.token);
  const error = useSelector(state => state.user.error);
  const oldName = useSelector(state => state.user.name);

  const [name, setName] = useState(oldName);

  useEffect(() => {
    if (!token) navigation.navigate("Login");
  }, [token]);

  useEffect(() => {
    if (error) {
      Alert.alert(windowTitle, error);
    }
  }, [error]);

  return (
    <SafeAreaView style={commonStyles.container}>
      <KeyboardAvoidingScrollView style={commonStyles.scrollView}>
        <View style={commonStyles.titleContainer}>
          <Text style={commonStyles.title}>Update informations</Text>
        </View>

        <View style={commonStyles.formContainer}>
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
        </View>
      </KeyboardAvoidingScrollView>
    </SafeAreaView>
  );
}