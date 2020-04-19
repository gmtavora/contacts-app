import 'react-native-gesture-handler';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './screens/Login';
import ContactsList from './screens/ContactsList';
import AddContact from './screens/AddContact';
import SearchContact from './screens/SearchContact';
import Settings from './screens/Settings';
import SignUp from './screens/SignUp';

const AppStack = createStackNavigator();
const ContactsStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Contacts() {
  return (
    <ContactsStack.Navigator headerMode="none">
      <ContactsStack.Screen name="ContactsList" component={ContactsList} />
      <ContactsStack.Screen name="AddContact" component={AddContact} />
      <ContactsStack.Screen name="SearchContact" component={SearchContact} />
    </ContactsStack.Navigator>
  );
}

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
    <Tab.Navigator
      screenOptions={iconSelector}
      tabBarOptions={{
        activeTintColor: "#12153d",
        showLabel: false,
      }}
    >
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
          <AppStack.Screen name={"SignUp"} component={SignUp} />
          <AppStack.Screen name={"Main"} component={Main}/>
        </AppStack.Navigator>
      </NavigationContainer>
    );
  }