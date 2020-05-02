import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

export default class Row extends React.PureComponent {
  render() {
      return (
        <TouchableOpacity style={styles.contact} onPress={() => this.props.navigation.navigate("FriendDetails", {contactId: this.props.obj.id})}>
          <View style={styles.thumbnail}>
            <Image
              style={styles.profilePicture}
              source={{uri: this.props.obj.picture}}
            />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>{this.props.obj.name}</Text>
            <Text style={styles.contactCompany}>{this.props.obj.company}</Text>
          </View>
        </TouchableOpacity>
      );
  }
}