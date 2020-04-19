import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import commonStyles from '../commonStyles';

export default function AddContact() {
  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.titleContainer}>
        <Text style={commonStyles.title}>Add Contact</Text>
      </View>

      <View style={commonStyles.formContainer}>
        <Text style={commonStyles.inputLabel}>Name</Text>
        <TextInput style={commonStyles.input} />

        <TouchableOpacity style={commonStyles.submitButton}>
          <Text style={commonStyles.whiteText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}