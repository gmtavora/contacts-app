import React, { useState, useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, Text, View, Alert, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { Formik } from 'formik';
import * as yup from 'yup';

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

  const schema = yup.object().shape({
    oldPassword: yup.string().required("Please inform your old password.").min(8, "Your password should be at least 8 characters long."),
    newPassword: yup.string().required("Please inform your new password.").min(8, "Your password should be at least 8 characters long."),
    repeatNewPassword: yup.string().required("Please repeat your password.").test("passwords-match", "Passwords don't match.", function (value) {return this.parent.newPassword === value})
  });

  const [changeRequested, setChangeRequested] = useState(false);

  useEffect(() => {
    if (!token) navigation.navigate("Login");
  }, [token]);

  useEffect(() => {
    if (error) {
      Alert.alert(windowTitle, `Error: ${error}`);
      dispatch(clearError());
      setChangeRequested(false);
    }
  }, [error]);

  useEffect(() => {
    if (response) {
      Alert.alert(windowTitle, response);
      dispatch(clearPasswordResponse());
      setChangeRequested(false);
      navigation.goBack();
    }
  }, [response]);

  function submitForm({ oldPassword, newPassword }) {
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

        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            repeatNewPassword: ""
          }}
          onSubmit={submitForm}
          validationSchema={schema}
        >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <Text style={commonStyles.inputLabel}>Old password</Text>
            <TextInput
              style={commonStyles.input}
              autoCapitalize="none"
              autoCompleteType="password"
              maxLength={32}
              textContentType="password"
              value={values.oldPassword}
              onChangeText={handleChange("oldPassword")}
              secureTextEntry
            />
            { (errors.oldPassword && touched.oldPassword) ? <Text style={commonStyles.inputError}>{errors.oldPassword}</Text>
                                                          : null
            }

            <Text style={commonStyles.inputLabel}>New password</Text>
            <TextInput
              style={commonStyles.input}
              autoCapitalize="none"
              autoCompleteType="password"
              maxLength={32}
              textContentType="password"
              value={values.newPassword}
              onChangeText={handleChange("newPassword")}
              secureTextEntry
            />
            { (errors.newPassword && touched.newPassword) ? <Text style={commonStyles.inputError}>{errors.newPassword}</Text>
                                                          : null
            }

            <Text style={commonStyles.inputLabel}>Repeat new password</Text>
            <TextInput
              style={commonStyles.input}
              autoCapitalize="none"
              autoCompleteType="password"
              maxLength={32}
              textContentType="password"
              value={values.repeatNewPassword}
              onChangeText={handleChange("repeatNewPassword")}
              secureTextEntry
            />
            { (errors.repeatNewPassword && touched.repeatNewPassword) ? <Text style={commonStyles.inputError}>{errors.repeatNewPassword}</Text>
                                                                      : null
            }

            { changeRequested ? <View style={[commonStyles.submitButton, commonStyles.disabledButton]}>
                                  <ActivityIndicator size="small" color="#000" />
                                </View>
                              : <TouchableOpacity style={commonStyles.submitButton} onPress={handleSubmit}>
                                  <Text style={commonStyles.whiteText}>Submit</Text>
                                </TouchableOpacity>
            }
          </View>
        )}
        </Formik>
      </KeyboardAvoidingScrollView>
    </SafeAreaView>
  );
}