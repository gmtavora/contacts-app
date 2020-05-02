import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, SectionList, useWindowDimensions, ActivityIndicator, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { getFriendsList, clearError, getFriendRequests, clearRequest } from '../../../redux/actions';

import commonStyles, { blue } from '../commonStyles';
import styles from './styles';

import Row from './Row';

const renderSection = (section, category, width) => {
  if (!category || section.numberOfFavorites)
    return <Text style={[styles.sectionHeader, {marginLeft: width * 0.15}]}>{section.title}</Text>;
  else
    return null;
};

export default function ContactsList({ navigation }) {
  const [category, setCategory] = useState(0);
  const [contactsLoaded, setContactsLoaded] = useState(false);
  const [requestsLoaded, setRequestsLoaded] = useState(false);
  const token = useSelector(state => state.user.token);
  const id = useSelector(state => state.user.id);
  const contacts = useSelector(state => state.contacts);
  const requestsList = useSelector(state => state.requests.list);
  const error = useSelector(state => state.user.error);
  const requestsError = useSelector(state => state.requests.error);
  const dispatch = useDispatch();

  const width = useWindowDimensions().width * 0.2 * 0.9;

  function requestFriendsList() {
    if (error) dispatch(clearError());
    dispatch(getFriendsList(token, id));
  }

  useEffect(() => {
    if (!token) navigation.navigate("Login");
  }, [token]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => requestFriendsList());

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (contacts) setContactsLoaded(true);
  }, [contacts]);

  useEffect(() => {
    if (requestsList) setRequestsLoaded(true);
  }, [requestsList]);

  useEffect(() => {
    if (requestsError) {
      Alert.alert("Friends list", requestsError);
      dispatch(clearRequest());
    }
  }, [requestsError]);
  
  if (error) {
    return (
      <View style={commonStyles.container}>
        <TouchableOpacity style={styles.centralize} onPress={requestFriendsList}>
          <MaterialIcons name={"error"} size={40} style={styles.errorIcon} />
          <Text>{error}</Text>
          <Text>Press to refresh.</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!contactsLoaded) {
    return (
      <View style={commonStyles.container}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  }

  if (contactsLoaded && contacts.length === 0) {
    return (
      <View style={commonStyles.container}>
        <View style={commonStyles.titleContainer}>
          <Text style={commonStyles.title}>Contacts</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SearchFriend")}>
            <MaterialIcons name={"search"} size={40} color={blue} />
          </TouchableOpacity>
        </View>
    
        <View style={styles.selectorContainer}>
          <TouchableOpacity style={styles.touchable} onPress={() => {setCategory(0);}}>
            <View style={!category && styles.touchableActive}>
              <Text style={[styles.touchableText, !category && styles.touchableTextActive]}>All</Text>
            </View>
          </TouchableOpacity>
    
          <TouchableOpacity style={styles.touchable} onPress={() => {setCategory(1);}}>
            <View style={category && styles.touchableActive}>
              <Text style={[styles.touchableText, category && styles.touchableTextActive]}>Favorites</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={[styles.contactsContainer, styles.centralize]}>
          <Text>You have no contacts yet.</Text>
        </View>

        <TouchableOpacity style={styles.addContactButton} onPress={() => navigation.navigate("AddFriend")}>
          <View style={styles.addContactButtonIcon}>
            <MaterialIcons name="add" size={32} color="#FFF" />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.titleContainer}>
        <Text style={commonStyles.title}>Contacts</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SearchFriend")}>
          <MaterialIcons name={"search"} size={40} color={blue} />
        </TouchableOpacity>
      </View>
    
      <View style={styles.selectorContainer}>
        <TouchableOpacity style={styles.touchable} onPress={() => {setCategory(0);}}>
          <View style={!category && styles.touchableActive}>
            <Text style={[styles.touchableText, !category && styles.touchableTextActive]}>All</Text>
        </View>
        </TouchableOpacity>
    
        <TouchableOpacity style={styles.touchable} onPress={() => {setCategory(1);}}>
          <View style={category && styles.touchableActive}>
            <Text style={[styles.touchableText, category && styles.touchableTextActive]}>Favorites</Text>
          </View>
        </TouchableOpacity>
      </View>
    
      <View style={styles.contactsContainer}>
        <SectionList
          sections={contacts}
          renderItem={({ item }) => <Row obj={item} category={category} navigation={navigation} />}
          renderSectionHeader={({ section }) => renderSection(section, category, width)}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    
      <TouchableOpacity style={styles.addContactButton} onPress={() => navigation.navigate("AddFriend")}>
        <View style={styles.addContactButtonIcon}>
          <MaterialIcons name="add" size={32} color="#FFF" />
        </View>
      </TouchableOpacity>
    </View>
  );
}