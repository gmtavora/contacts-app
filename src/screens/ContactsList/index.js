import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SectionList, useWindowDimensions, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import commonStyles, { blue } from '../commonStyles';
import styles from './styles';

import fetchContacts from '../../api/randomUser';
import Row from './Row';

const renderSection = (section, category, width) => {
  if (!category || section.numberOfFavorites)
    return <Text style={[styles.sectionHeader, {marginLeft: width * 0.15}]}>{section.title}</Text>;
  else
    return null;
};

export default function ContactsList({ navigation }) {
  const [category, setCategory] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [contactsLoaded, setContactsLoaded] = useState(false);
  const [error, setError] = useState(undefined);

  const width = useWindowDimensions().width * 0.2 * 0.9;

  async function updateContacts() {
    const results = await fetchContacts();
    try {
      setContacts(results);
      setContactsLoaded(true);
    }
    catch (err) {
      setError(err);
    }
  }

  useEffect(() => {
    if (!contactsLoaded)
      updateContacts();
  }, []);
  
  return (
    (error &&
      <View style={commonStyles.container}><Text>{error.message}</Text></View>)
    || (!contactsLoaded &&
        <View style={commonStyles.container}><ActivityIndicator size="small" color="#0000ff" /></View>)
    || (contactsLoaded &&
      <View style={commonStyles.container}>
        <View style={commonStyles.titleContainer}>
          <Text style={commonStyles.title}>Contacts</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SearchContact")}>
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
            renderItem={({ item }) => <Row obj={item} category={category}/>}
            renderSectionHeader={({ section }) => renderSection(section, category, width)}
            keyExtractor={item => item.id.toString()}
          />
        </View>

        <TouchableOpacity style={styles.addContactButton} onPress={() => navigation.navigate("AddContact")}>
          <View style={styles.addContactButtonIcon}>
            <MaterialIcons name="add" size={32} color="#FFF" />
          </View>
        </TouchableOpacity>
      </View>
  ));
}