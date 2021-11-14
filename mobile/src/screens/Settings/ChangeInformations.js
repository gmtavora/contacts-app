import React, { useState, useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, Text, View, Alert, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { TextInputMask } from 'react-native-masked-text';
import { Formik } from 'formik';
import * as yup from 'yup';

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

  const [changeRequested, setChangeRequested] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required("Please inform your name.").min(4, "Your name should be at least 4 characters long."),
    phone: yup.string().required("Please inform your phone.").min(14, "Invalid phone."),
    cell: yup.string().required("Please inform your cellphone.").min(14, "Invalid cellphone."),
    email: yup.string().email("Invalid email").required("Please inform your email."),
    address: yup.string(),
    city: yup.string(),
    state: yup.string(),
    country: yup.string(),
    birthday: yup.string().min(10, "Invalid date."),
    company: yup.string().required("Please inform your company."),
    nationality: yup.string()
  });

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

  async function submitForm({ name, phone, cell, email, address, city, state, country, birthday, company, nationality}) {
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

        <Formik
          initialValues={{
            name: oldName,
            phone: oldPhone,
            cell: oldCell,
            email: oldEmail,
            address: oldAddress,
            city: oldCity,
            state: oldState,
            country: oldCountry,
            birthday: oldBirthday,
            company: oldCompany,
            nationality: oldNationality
          }}
          onSubmit={submitForm}
          validationSchema={schema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
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
              { (errors.name && touched.name) ? <Text style={commonStyles.inputError}>{errors.name}</Text>
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
                style={commonStyles.input}
                autoCompleteType="tel"
                maxLength={17}
                textContentType="telephoneNumber"
                value={values.phone}
                onChangeText={handleChange("phone")}
              />
              { (errors.phone && touched.phone) ? <Text style={commonStyles.inputError}>{errors.name}</Text>
                                                : null
              }

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
                value={values.cell}
                onChangeText={handleChange("cell")}
              />
              { (errors.cell && touched.cell) ? <Text style={commonStyles.inputError}>{errors.cell}</Text>
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
              { (errors.email && touched.email) ? <Text style={commonStyles.inputError}>{errors.email}</Text>
                                                : null
              }

              <Text style={commonStyles.inputLabel}>Address</Text>
              <TextInput
                style={commonStyles.input}
                autoCapitalize="words"
                autoCompleteType="street-address"
                maxLength={64}
                textContentType="streetAddressLine1"
                value={values.address}
                onChangeText={handleChange("address")}
              />
              { (errors.address) && (touched.address) ? <Text style={commonStyles.inputError}>{errors.address}</Text>
                                                      : null
              }

              <Text style={commonStyles.inputLabel}>City</Text>
              <TextInput
                style={commonStyles.input}
                autoCapitalize="words"
                maxLength={32}
                textContentType="addressCity"
                value={values.city}
                onChangeText={handleChange("city")}
              />
              { (errors.city && touched.city) ? <Text style={commonStyles.inputError}>{errors.city}</Text>
                                              : null
              }

              <Text style={commonStyles.inputLabel}>State</Text>
              <TextInput
                style={commonStyles.input}
                autoCapitalize="words"
                maxLength={32}
                textContentType="addressState"
                value={values.state}
                onChangeText={handleChange("state")}
              />
              { (errors.state && touched.state) ? <Text style={commonStyles.inputError}>{errors.state}</Text>
                                                : null
              }

              <Text style={commonStyles.inputLabel}>Country</Text>
              <TextInput
                style={commonStyles.input}
                autoCapitalize="words"
                maxLength={32}
                textContentType="countryName"
                value={values.country}
                onChangeText={handleChange("country")}
              />
              { (errors.country && touched.country) ? <Text style={commonStyles.inputError}>{errors.country}</Text>
                                                    : null
              }

              <Text style={commonStyles.inputLabel}>Birthday</Text>
              <TextInputMask
                type="datetime"
                options={{
                  format: "DD/MM/YYYY"
                }}
                value={values.birthday}
                onChangeText={handleChange("birthday")}
                style={commonStyles.input}
                keyboardType="numeric"
                maxLength={10}
              />
              { (errors.birthday && touched.birthday) ? <Text style={commonStyles.inputError}>{errors.birthday}</Text>
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
              { (errors.company && touched.company) ? <Text style={commonStyles.inputError}>{errors.company}</Text>
                                                    : null
              }

              <Text style={commonStyles.inputLabel}>Nationality</Text>
              <TextInput
                style={commonStyles.input}
                maxLength={32}
                value={values.nationality}
                onChangeText={handleChange("nationality")}
              />
              { (errors.nationality && touched.nationality) ? <Text style={commonStyles.inputError}>{errors.nationality}</Text>
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