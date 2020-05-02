import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { addFavorite, removeFavorite, clearError } from '../../../redux/actions';

import styles, { iconColor } from './styles';

export default function ContactDetails({ route, navigation }) {
  const { contactId } = route.params;

  const [contactInfo, setContactInfo] = useState({});

  const token = useSelector(state => state.user.token);
  const id = useSelector(state => state.user.id);
  const contacts = useSelector(state => state.contacts);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) navigation.navigate("Login");
  }, [token]);

  useEffect(() => {
    if (contacts) {
      contacts.map((letter) => {
        letter.data.map((item) => {
          if (item.id === contactId)
            return setContactInfo(item);
        });
      });
    }
  }, [contacts]);

  return (
    <View syle={styles.scrollViewContainer}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.starContainer}>
            {
              (contactInfo.favorite)
                ? <TouchableOpacity onPress={() => dispatch(removeFavorite(token, id, contactInfo.id))}>
                    <MaterialIcons name="star" size={25} style={styles.star} />
                  </TouchableOpacity>
                : <TouchableOpacity onPress={() => dispatch(addFavorite(token, id, contactInfo.id))}>
                    <MaterialIcons name="star-border" size={25} style={styles.star} />
                  </TouchableOpacity>
            }
          </View>

          <View style={styles.identityContainer}>
            <View style={styles.thumbnail}>
              <Image
                style={{aspectRatio: 1, borderRadius: 48}}
                source={{uri: contactInfo.picture}}
              />
            </View>
            <Text style={styles.name}>{contactInfo.name}</Text>
            <Text style={styles.company}>{contactInfo.company}</Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.emphasizedInfo}>
              <View style={styles.emphasizedIcon}>
                <MaterialCommunityIcons name="cellphone" size={16} color={iconColor} />
              </View>
              <View>
                <Text style={styles.emphasizedTitle}>Mobile</Text>
                <Text style={styles.emphasizedText}>{contactInfo.cell}</Text>
              </View>
            </View>

            <View style={styles.emphasizedInfo}>
              <View style={styles.emphasizedIcon}>
                <MaterialCommunityIcons name="phone-classic" size={16} color={iconColor} />
              </View>
              
              <View>
                <Text style={styles.emphasizedTitle}>Phone</Text>
                <Text style={styles.emphasizedText}>{contactInfo.phone}</Text>
              </View>
            </View>

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

        <View style={styles.container}>
          <View style={styles.emphasizedInfo}>
            <View style={styles.emphasizedIcon}>
              <MaterialIcons name="location-on" size={16} color={iconColor} />
            </View>
            <View>
              <Text style={styles.emphasizedTitle}>Address</Text>
              <Text style={styles.emphasizedText}>{contactInfo.address}</Text>
              <Text style={styles.emphasizedText}>{contactInfo.city}</Text>
              <Text style={styles.emphasizedText}>{contactInfo.state}</Text>
              <Text style={styles.emphasizedText}>{contactInfo.country}</Text>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.emphasizedInfo}>
            <View style={styles.emphasizedIcon}>
              <MaterialIcons name="cake" size={16} color={iconColor} />
            </View>
            <View>
              <Text style={styles.emphasizedTitle}>Birthday</Text>
              <Text style={styles.emphasizedText}>{contactInfo.birthday}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}