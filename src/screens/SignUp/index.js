import React from 'react';
import { View, Text } from 'react-native';

import SignUpForm from './SignUpForm';

import commonStyles from '../commonStyles';

export default function AddContact() {
  return ( 
    <View style={commonStyles.container}>
      <View style={commonStyles.titleContainer}>
        <Text style={commonStyles.title}>Sign Up</Text>
      </View>

      <SignUpForm />
    </View>
  );
};