import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView, View, Text, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { sendFriendRequest, acceptFriendRequest, refuseFriendRequest, clearRequest } from '../../../redux/actions';

import styles, { iconColor } from './styles';

export default function ContactDetails({ route, navigation }) {
  const { contactInfo } = route.params;

  const [alreadyRequested, setAlreadyRequested] = useState(false);
  const [requestReceived, setRequestReceived] = useState(false);

  const token = useSelector(state => state.user.token);
  const id = useSelector(state => state.user.id);
  const requestsList = useSelector(state => state.requests.list);
  const friendsList = useSelector(state => state.contacts);
  const sentFriendRequest = useSelector(state => state.requests.sentFriendRequest);
  const requestRegistered = useSelector(state => state.requests.requestRegistered);
  const requestAcceptanceSent = useSelector(state => state.requests.requestAcceptanceSent);
  const requestAccepted = useSelector(state => state.requests.requestAcceptance);
  const requestRefusalSent = useSelector(state => state.requests.requestRefusalSent);
  const requestRefused = useSelector(state => state.requests.requestRefusal);
  const error = useSelector(state => state.requests.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) navigation.navigate("Login");
  }, [token]);

  useEffect(() => {
    if (error) {
      Alert.alert("Add contact", error);
      dispatch(clearRequest());
    }
  }, [error]);

  useEffect(() => {
    if (requestAccepted) {
      Alert.alert("Add contact", requestAccepted);
      dispatch(clearRequest());
      navigation.goBack();
    }
  }, [requestAccepted]);

  useEffect(() => {
    if (requestRefused) {
      Alert.alert("Add contact", requestRefused);
      dispatch(clearRequest());
      navigation.goBack();
    }
  }, [requestRefused]);

  useEffect(() => {
    if (requestsList) {
      const req = requestsList.filter((item) => item.id === contactInfo.id)[0];

      if (req) {
        if (req.lastUserID === req.id)
          return setRequestReceived(true);
        else return setAlreadyRequested(true);
      }
    }

    if (friendsList) {
      const friend = friendsList.filter((item) => item.id === contactInfo.id);

      if (friend.length) return setAlreadyRequested(true);
    }
  }, [requestsList, friendsList]);

  useEffect(() => {
    if (requestRegistered) {
      Alert.alert("Add contact", "Request registered");
      setAlreadyRequested(true);
      dispatch(clearRequest());
    }
  }, [requestRegistered]);

  function acceptRequest() {
    dispatch(acceptFriendRequest(token, id, contactInfo.requestID));
  }

  function refuseRequest() {
    dispatch(refuseFriendRequest(token, id, contactInfo.requestID));
  }

  return (
    <View syle={styles.scrollViewContainer}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.identityContainer}>
            <View style={styles.thumbnail}>
              { contactInfo.avatar ?  <Image
                                        style={styles.profilePicture}
                                        source={{uri: contactInfo.avatar}}
                                      />
                                    : <Image
                                        style={styles.profilePicture}
                                        source={require("../../../assets/anonymous-avatar-icon-25.jpg")}
                                      />
              }
            </View>
            <Text style={styles.name}>{contactInfo.name}</Text>
            <Text style={styles.company}>{contactInfo.company}</Text>

            <View style={styles.actionContainer}>
            {
              (!requestReceived)
              ? (!sentFriendRequest)
                ? (!alreadyRequested)
                  ? (!requestReceived)
                    ? <TouchableOpacity style={styles.addContactButton} onPress={() => dispatch(sendFriendRequest(token, id, contactInfo.id))}>
                        <Text style={styles.acceptText}>Add contact</Text>
                      </TouchableOpacity>
                    : <View style={[styles.addContactButton, styles.disabledButton]}>
                        <ActivityIndicator size="small" color="#000" />
                      </View>
                  : <View style={[styles.addContactButton, styles.disabledButton]}>
                      <Text>Pending request</Text>
                    </View>
                : <View style={[styles.addContactButton, styles.disabledButton]}>
                    <ActivityIndicator size="small" color="#000" />
                  </View>
              : <>
                {
                  (!requestAcceptanceSent)
                  ? <TouchableOpacity style={styles.acceptButton} onPress={acceptRequest}>
                      <Text style={styles.acceptText}>Accept</Text>
                    </TouchableOpacity>
                  : <View style={[styles.acceptButton, styles.disabledButton]}>
                      <ActivityIndicator size="small" color="#000" />
                    </View>
                }
                {
                  (!requestRefusalSent)
                  ? <TouchableOpacity style={styles.declineButton} onPress={refuseRequest}>
                      <Text style={styles.declineText}>Decline</Text>
                    </TouchableOpacity>
                  : <View style={[styles.declineButton, styles.disabledButton]}>
                      <ActivityIndicator size="small" color="#000" />
                    </View>
                }
                </>
            }

            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.emphasizedInfo}>
              <View style={styles.emphasizedIcon}>
                <MaterialCommunityIcons name="email" size={16} color={iconColor} />
              </View>
              <View>
                <Text style={styles.emphasizedTitle}>Email</Text>
                <Text style={styles.emphasizedText}>{contactInfo.email}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}