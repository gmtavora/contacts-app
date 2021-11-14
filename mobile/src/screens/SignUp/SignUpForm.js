import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, Text, TextInput, TouchableOpacity, Alert, View, ActivityIndicator } from 'react-native';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { Formik } from 'formik';
import { TextInputMask } from 'react-native-masked-text';
import * as yup from 'yup';

import { registerUser, clearError } from '../../../redux/actions';

import commonStyles from '../commonStyles';

export default function AddContactForm({ navigation }) {
  const windowTitle = "Sign Up";
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);
  const error = useSelector(state => state.user.error);

  const [signUpRequested, setSignUpRequested] = useState(false);

  const schema = yup.object().shape({
    username: yup.string().required("Please inform an username.").min(4, "Your username should be at least 4 characters long."),
    password: yup.string().required("Please inform a password.").min(8, "Your password should be at least 8 characters long."),
    repeatPassword: yup.string().required("Please repeat your password.").test("passwords-match", "Passwords don't match.", function (value) {return this.parent.password === value}),
    name: yup.string().required("Please inform your name."),
    phone: yup.string().required("Please inform your phone.").min(14, "Invalid phone."),
    email: yup.string().email("Invalid email").required("Please inform your email."),
    company: yup.string().required("Please inform your company.")
  });

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

  async function submitForm({ username, password, name, phone, email, company }) {
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
        <Formik
          initialValues={{
            username: "",
            password: "",
            repeatPassword: "",
            name: "",
            phone: "",
            email: "",
            company: ""
          }}
          onSubmit={submitForm}
          validationSchema={schema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <Text style={commonStyles.inputLabel}>Username</Text>
              <TextInput
                style={commonStyles.input}
                autoCapitalize="none"
                autoCompleteType="username"
                maxLength={32}
                textContentType="username"
                value={values.username}
                onChangeText={handleChange("username")}
                autoFocus
              />
              { errors.username && touched.username ? <Text style={commonStyles.inputError}>{errors.username}</Text>
                                                    : null
              }

              <Text style={commonStyles.inputLabel}>Password</Text>
              <TextInput
                style={commonStyles.input}
                autoCapitalize="none"
                autoCompleteType="password"
                maxLength={32}
                textContentType="password"
                value={values.password}
                onChangeText={handleChange("password")}
                secureTextEntry
              />
              { errors.password && touched.password ? <Text style={commonStyles.inputError}>{errors.password}</Text>
                                                    : null
              }

              <Text style={commonStyles.inputLabel}>Repeat Password</Text>
              <TextInput
                style={commonStyles.input}
                autoCapitalize="none"
                autoCompleteType="password"
                maxLength={32}
                textContentType="password"
                value={values.repeatPassword}
                onChangeText={handleChange("repeatPassword")}
                secureTextEntry
              />
              { errors.repeatPassword && touched.repeatPassword ? <Text style={commonStyles.inputError}>{errors.repeatPassword}</Text>
                                                                : null
              }

              <Text style={commonStyles.inputLabel}>Name</Text>
              <TextInput
                style={commonStyles.input}
                autoCapitalize="words"
                autoCompleteType="name"
                maxLength={32}
                textContentType="name"
                value={values.name}
                onChangeText={handleChange("name")}
              />
              { errors.name && touched.name ? <Text style={commonStyles.inputError}>{errors.name}</Text>
                                            : null
              }

              <Text style={commonStyles.inputLabel}>Phone</Text>
              <TextInputMask
                type="cel-phone"
                options={{
                  maskType: "BRL",
                  withDDD: true,
                  dddMask: "(99) "
                }}
                value={values.phone}
                onChangeText={handleChange("phone")}
                style={commonStyles.input}
                autoCompleteType="tel"
                maxLength={17}
                keyboardType="numeric"
                textContentType="telephoneNumber"
              />
              { errors.phone && touched.phone ? <Text style={commonStyles.inputError}>{errors.phone}</Text>
                                              : null
              }

              <Text style={commonStyles.inputLabel}>Email</Text>
              <TextInput
                style={commonStyles.input}
                autoCapitalize="none"
                autoCompleteType="email"
                maxLength={32}
                keyboardType="email-address"
                textContentType="emailAddress"
                value={values.email}
                onChangeText={handleChange("email")}
              />
              { errors.email && touched.email ? <Text style={commonStyles.inputError}>{errors.email}</Text>
                                              : null
              }

              <Text style={commonStyles.inputLabel}>Company</Text>
              <TextInput
                style={commonStyles.input}
                autoCapitalize="words"
                maxLength={32}
                textContentType="organizationName"
                value={values.company}
                onChangeText={handleChange("company")}
              />
              { errors.company && touched.company ? <Text style={commonStyles.inputError}>{errors.company}</Text>
                                                  : null
              }

              { signUpRequested ? <View style={[commonStyles.submitButton, commonStyles.disabledButton]}>
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