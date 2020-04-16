import 'react-native-gesture-handler';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Login from './screens/Login';
import Contacts from './screens/Contacts';
import Settings from './screens/Settings'

const AppStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Main() {
  function iconSelector({ route }) {
    return {
        tabBarIcon: ({ focused, color, size }) => {
        let iconName;
          
        if (route.name === "Contacts") {
          iconName = focused
            ? "contacts"
            : "contacts";
        } else if (route.name === "Settings") {
          iconName = focused
            ? "settings-applications"
            : "settings-applications";
        }
    
        return <MaterialIcons name={iconName} size={size} color={color} />;
      }
    };
  }
  
  return (
    <Tab.Navigator screenOptions={iconSelector}>
      <Tab.Screen name={"Contacts"} component={Contacts} />
      <Tab.Screen name={"Settings"} component={Settings} />
    </Tab.Navigator>
    );
}
  
  export default function Routes() {
    return (
      <NavigationContainer>
        <AppStack.Navigator headerMode="none">
          <AppStack.Screen name={"Login"} component={Login} />
          <AppStack.Screen name={"Main"} component={Main}/>
        </AppStack.Navigator>
      </NavigationContainer>
    );
  }