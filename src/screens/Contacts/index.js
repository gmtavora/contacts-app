import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';

const DATA = [
  {
    id: '0',
    name: 'John Smith',
    phone: '21000000000'
  },
  {
    id: '1',
    name: 'Peter Johson',
    phone: '21000000000'
  },
  {
    id: '2',
    name: 'Mark Peterson',
    phone: '21000000000'
  },
  {
    id: '3',
    name: 'Carl Markson',
    phone: '21000000000'
  },
  {
    id: '4',
    name: 'Tom Carlson',
    phone: '21000000000'
  },
  {
    id: '5',
    name: 'Cris Tomson',
    phone: '21000000000'
  },
  {
    id: '6',
    name: 'Eric Crisson',
    phone: '21000000000'
  },
  {
    id: '7',
    name: 'Paul Ericson',
    phone: '21000000000'
  },
  {
    id: '8',
    name: 'Kyle Paulson',
    phone: '21000000000'
  }
];

function Item(obj) {
  return (
    <View style={{margin: 10}}>
      <Text>{obj.name}</Text>
      <Text>{obj.phone}</Text>
    </View>
  );
}

export default function Contacts() {
  const [category, setCategory] = useState(0);
  
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Contacts</Text>
        <MaterialIcons name={"search"} size={40} color={"blue"} />
      </View>

      <View style={styles.selectorContainer}>
        <TouchableOpacity style={styles.touchable} onPress={() => {setCategory(0);}}>
          <View style={!category && styles.touchableActive}>
            <Text>Favorites</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchable} onPress={() => {setCategory(1);}}>
          <View style={category && styles.touchableActive}>
            <Text>All</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.contactsContainer}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => Item(item)}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  )
}