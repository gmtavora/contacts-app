import React, { useState, useEffect } from 'react';
import { Platform, Alert, SafeAreaView, Text, TouchableOpacity, Image, View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { changeAvatar, clearAvatarResponse, clearError } from '../../../redux/actions';

import commonStyles from '../commonStyles';
import styles from './styles';

export default function ChangeAvatarForm({ navigation }) {
  const windowTitle = "Change avatar";
  const dispatch = useDispatch();
  const id = useSelector(state => state.user.id);
  const token = useSelector(state => state.user.token);
  const error = useSelector(state => state.user.error);
  const response = useSelector(state => state.user.avatarResponse);
  const currentAvatar = useSelector(state => state.user.avatar);

  const [avatar, setAvatar] = useState();
  const [submitted, setSubmitted] = useState(false);

  useEffect(async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert("Sorry, we need that permission");
      }
    }
  }, []);

  useEffect(() => {
    if (!token) navigation.navigate("Login");
  }, [token]);

  useEffect(() => {
    if (error) {
      Alert.alert(windowTitle, error);
      dispatch(clearError());
      setSubmitted(false);
    }
  }, [error]);

  useEffect(() => {
    if (response) {
      if (response.hasOwnProperty("uri")) {
        setAvatar();

        Alert.alert(windowTitle, "Avatar changed successfully.");
      } else {
        Alert.alert(windowTitle, "Avatar not changed.");
      }

      dispatch(clearAvatarResponse())
      setSubmitted(false);
    }
  }, [response]);

  async function pickImage() {
    const data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    })

    if (data.cancelled) return;
    if (!data.uri) return;

    setAvatar(data);
  }

  async function handleSubmit() {
    const type = `image/${avatar.uri.split('.').pop()}`;

    const data = new FormData();

    data.append("avatar", {
      uri: avatar.uri,
      type: type,
      name: avatar.uri.split('/').pop()
    });

    dispatch(changeAvatar(id, token, data));
    setSubmitted(true);
  }

  async function deleteAvatar() {
    Alert.alert(windowTitle, "Do you want to delete your avatar?", [{
      text: "Yes",
      onPress: () => {
        dispatch(changeAvatar(id, token, {}));
        setSubmitted(true);
      }
    }, {
      text: "No",
      onPress: () => {}
    }
    ]);
  }

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.titleContainer}>
        <Text style={commonStyles.title}>Change avatar</Text>
      </View>

      <View style={commonStyles.formContainer}>
        <View style={styles.actionContainer}>
          <View style={styles.avatarContainer}>
            { (avatar && avatar !== "") ? <Image
                                            style={styles.thumbnail}
                                            source={{ uri: avatar.uri }}
                                          />
                                        : (currentAvatar  ? <Image
                                                              style={styles.thumbnail}
                                                              source={{ uri: currentAvatar }}
                                                            />
                                                          : <Image
                                                              style={styles.thumbnail}
                                                              source={require("../../../assets/anonymous-avatar-icon-25.jpg")}
                                                            />
                                          )
            }
          </View>

          <View style={{ flexDirection: "column" }}>
            <TouchableOpacity onPress={pickImage} style={[commonStyles.button, styles.actionButton]}>
              <FontAwesome name="image" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteAvatar} style={[commonStyles.button, styles.actionButton]}>
              <FontAwesome name="sticky-note-o" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        { (submitted) ? <View style={[commonStyles.submitButton, commonStyles.disabledButton]}>
                          <ActivityIndicator size="small" color="#000" />
                        </View>
                      : <TouchableOpacity style={commonStyles.submitButton} onPress={handleSubmit}>
                          <Text style={commonStyles.whiteText}>Submit</Text>
                        </TouchableOpacity>
        }
      </View>
    </SafeAreaView>
  );
};