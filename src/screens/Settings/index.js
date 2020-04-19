import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import commonStyles from '../commonStyles';

export default function Settings() {
  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.titleContainer}>
        <Text style={commonStyles.title}>Settings</Text>
      </View>

      <View style={commonStyles.formContainer}>
        <TouchableOpacity style={commonStyles.submitButton}>
          <Text style={commonStyles.whiteText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}