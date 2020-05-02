import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

export default class Row extends React.PureComponent {
  render() {
    if ((this.props.category === 1 && this.props.obj.favorite) || !this.props.category)
      return (
        <TouchableOpacity onPress={() => this.props.navigation.navigate("FriendDetails", {contactId: this.props.obj.id})}>
          <View style={styles.contact}>
            <View style={[styles.thumbnail]}>
              <Image
                style={styles.profilePicture}
                source={{uri: this.props.obj.picture}}
              />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{this.props.obj.name}</Text>
              <Text style={styles.contactCompany}>{this.props.obj.company}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    else
      return null;
  }
}