import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';

import SignUpForm from './SignUpForm';

import commonStyles from '../commonStyles';

export default function AddContact({ navigation }) {
  //const windowHeight = useWindowDimensions().height

  return ( 
    <View style={[commonStyles.container, /*{ minHeight: windowHeight }*/]}>
      <View style={commonStyles.titleContainer}>
        <Text style={commonStyles.title}>Sign Up</Text>
      </View>

      <SignUpForm navigation={navigation} />
    </View>
  );
};