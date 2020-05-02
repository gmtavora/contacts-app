import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';

import Row from './Row';

import commonStyles from '../commonStyles';
import styles from './styles';

export default function SearchFriend({ navigation }) {
  const [name, setName] = useState("");
  const [submitable, setSubmitable] = useState(false);
  const [results, setResults] = useState([]);

  const token = useSelector(state => state.user.token);
  const contacts = useSelector(state => state.contacts);

  useEffect(() => {
    if (!token) navigation.navigate("Login");
  }, [token]);

  useEffect(() => {
    if (name.length > 3) setSubmitable(true);
    else setSubmitable(false);
  }, [name]);

  function search() {
    if (contacts) {
      let aux = [];

      contacts.map((letter) => {
        aux = [...aux, ...letter.data.filter((item) => {
          if (item.name.search(name) > -1) return true;
        })];
      });

      setResults(aux);
    }
  }

  return (
    <View style={commonStyles.container}>
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
          (submitable) ? <TouchableOpacity style={styles.submitButton} onPress={search}>
                           <Text style={commonStyles.whiteText}>Submit</Text>
                         </TouchableOpacity>
                       : <View style={[styles.submitButton, styles.disabledButton]}>
                           <Text style={styles.grayText}>Submit</Text>
                         </View>
        }
      </View>

      <View style={styles.resultsContainer}>
        {
          (results && results.length) ? <FlatList
                                          data={results}
                                          renderItem={({ item }) => <Row obj={item} navigation={navigation} />}
                                          keyExtractor={item => item.id.toString()}
                                        />
                                      : (results && !results.length)
                                        ? <Text>No contacts found.</Text>
                                        : null
        }
      </View>
    </View>
  );
}