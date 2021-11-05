import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';

import { logOutUser } from '../../../redux/actions';

import commonStyles from '../commonStyles';
import styles from './styles';

export default function Settings({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);

  useEffect(() => {
    if (!token) navigation.navigate("Login");
  }, [token]);

  function handleLogout() {
    dispatch(logOutUser());
  }

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.titleContainer}>
        <Text style={commonStyles.title}>Settings</Text>
      </View>

      <View style={commonStyles.formContainer}>
        <TouchableOpacity style={[styles.menuButton, styles.menuButtonTop]} onPress={() => navigation.navigate("ChangeAvatar")}>
          <Text style={commonStyles.whiteText}>Change avatar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate("ChangePassword")}>
          <Text style={commonStyles.whiteText}>Change password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate("ChangeInformations")}>
          <Text style={commonStyles.whiteText}>Update Informations</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuButton, styles.menuButtonBottom]} onPress={handleLogout}>
          <Text style={commonStyles.whiteText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}