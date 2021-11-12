import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';
import commonStyles from '../commonStyles';

export default class Row extends React.PureComponent {
  render() {
      return (
        <TouchableOpacity style={styles.contact} onPress={() => this.props.navigation.navigate("UserDetails", {contactInfo: this.props.obj})}>
          <View style={styles.thumbnail}>
            <Image
              style={styles.profilePicture}
              source={{uri: this.props.obj.avatar}}
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