import React, { useState, useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, Text, View, Alert, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';

import commonStyles from '../commonStyles';
import styles from './styles';

import { changePassword, clearPasswordResponse, clearError } from '../../../redux/actions';

export default function ChangePasswordForm({ navigation }) {
  const windowTitle = "Change password";
  const dispatch = useDispatch();

  const id = useSelector(state => state.user.id);
  const token = useSelector(state => state.user.token);
  const error = useSelector(state => state.user.error);
  const response = useSelector(state => state.user.passwordResponse);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");

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
      Alert.alert(windowTitle, response);
      dispatch(clearPasswordResponse());
      setChangeRequested(false);
    }
  }, [response]);

  async function handleSubmit() {
    if (oldPassword.length < 8) return Alert.alert(windowTitle, "Your password should be at least 8 characters long");
    if (newPassword.length < 8) return Alert.alert(windowTitle, "Your password should be at least 8 characters long");

    if (newPassword !== repeatNewPassword) return Alert.alert(windowTitle, "Passwords don't match.");

    const data = {
      id,
      token,
      newPassword,
      oldPassword
    };

    dispatch(changePassword(data));
    setChangeRequested(true);
  }

  return (
    <SafeAreaView style={styles.formContainer}>
      <KeyboardAvoidingScrollView style={commonStyles.scrollView}>
        <View style={styles.titleContainer}>
          <Text style={commonStyles.title}>Change password</Text>
        </View>

        <Text style={commonStyles.inputLabel}>Old password</Text>
        <TextInput
          style={commonStyles.input}
          autoCapitalize="none"
          autoCompleteType="password"
          maxLength={32}
          textContentType="password"
          value={oldPassword}
          onChangeText={setOldPassword}
          secureTextEntry
        />

        <Text style={commonStyles.inputLabel}>New password</Text>
        <TextInput
          style={commonStyles.input}
          autoCapitalize="none"
          autoCompleteType="password"
          maxLength={32}
          textContentType="password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />

        <Text style={commonStyles.inputLabel}>Repeat new password</Text>
        <TextInput
          style={commonStyles.input}
          autoCapitalize="none"
          autoCompleteType="password"
          maxLength={32}
          textContentType="password"
          value={repeatNewPassword}
          onChangeText={setRepeatNewPassword}
          secureTextEntry
        />

        { changeRequested ? <View style={[commonStyles.submitButton, commonStyles.disabledButton]}>
                              <ActivityIndicator size="small" color="#000" />
                            </View>
                          : <TouchableOpacity style={commonStyles.submitButton}>
                              <Text style={commonStyles.whiteText}>Submit</Text>
                            </TouchableOpacity>
        }
      </KeyboardAvoidingScrollView>
    </SafeAreaView>
  );
}