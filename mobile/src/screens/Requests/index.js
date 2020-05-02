import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, FlatList, Alert, ActivityIndicator } from 'react-native';

import { getFriendRequests, clearRequest } from '../../../redux/actions';

import Row from './Row';

import commonStyles from '../commonStyles';

export default function Requests({ navigation }) {
  const token = useSelector(state => state.user.token);
  const id = useSelector(state => state.user.id);
  const requestedRequestsList = useSelector(state => state.requests.requestedRequestsList);
  const results = useSelector(state => state.requests.list);
  const error = useSelector(state => state.requests.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) navigation.navigate("Login");
  }, [token]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => dispatch(getFriendRequests(token, id)));

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (error) {
      Alert.alert("Requests", error);
      dispatch(clearRequest());
    }
  }, [error]);

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.titleContainer}>
        <Text style={commonStyles.title}>Requests</Text>
      </View>

      <View style={commonStyles.formContainer}>
        {
          (!requestedRequestsList) 
          ? (results && results.length)
            ? <FlatList
                data={results}
                renderItem={({ item }) => <Row obj={item} navigation={navigation} />}
                keyExtractor={item => item.id.toString()}
              />
            : <Text>You have no requests.</Text>
          : <ActivityIndicator size="small" color="#000" />
        }
      </View>
    </View>
  );
};