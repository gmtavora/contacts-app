import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, FlatList, useWindowDimensions } from 'react-native';

import { findUserByName, clearSearchError, clearSearchResults } from '../../../redux/actions';

import Row from './Row';

import commonStyles from '../commonStyles';
import styles from './styles';

export default function SearchContact({ navigation }) {
  const [name, setName] = useState("");
  const [submitable, setSubmitable] = useState(false);
  const id = useSelector(state => state.user.id);
  const token = useSelector(state => state.user.token);
  const searchRequested = useSelector(state => state.userSearch.requested);
  const results = useSelector(state => state.userSearch.result);
  const error = useSelector(state => state.userSearch.error);
  const dispatch = useDispatch();

  const windowHeight = useWindowDimensions().height;

  useEffect(() => {
    if (!token) navigation.navigate("Login");
  }, [token]);

  useEffect(() => {
    if (name.length > 3) setSubmitable(true);
    else setSubmitable(false);
  }, [name]);

  function requestSearch() {
    dispatch(clearSearchError());
    dispatch(clearSearchResults());
    dispatch(findUserByName(id, token, name));
  }

  return (
    <View style={[commonStyles.container, { minHeight: windowHeight }]}>
      <View style={commonStyles.titleContainer}>
        <Text style={commonStyles.title}>Search</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={setName}
        />
        {
          (submitable && !searchRequested) ? <TouchableOpacity style={styles.submitButton} onPress={requestSearch}>
                                               <Text style={commonStyles.whiteText}>Submit</Text>
                                             </TouchableOpacity>
          : (!searchRequested) ? <View style={[styles.submitButton, styles.disabledButton]}>
                                   <Text style={styles.grayText}>Submit</Text>
                                 </View>
          : <View style={[styles.submitButton, styles.disabledButton]}>
              <ActivityIndicator size="small" color="#000" />
            </View>
        }
      </View>

      <View style={styles.resultsContainer}>
        {
          (error) ? <Text>{error}</Text>
                  : (!searchRequested
                     && results
                     && results.length) ? <FlatList
                                            data={results}
                                            renderItem={({ item }) => <Row obj={item} navigation={navigation} />}
                                            keyExtractor={item => item.id.toString()}
                                          />
                  : (!searchRequested && results && !results.length) ? <Text>No contacts found.</Text>
                                                                     : null
        }
      </View>
    </View>
  );
}