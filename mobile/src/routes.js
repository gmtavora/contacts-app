import 'react-native-gesture-handler';
import React from 'react';
import { useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './screens/Login';
import FriendsList from './screens/FriendsList';
import AddFriend from './screens/AddFriend';
import SearchFriend from './screens/SearchFriend';
import SettingsHome from './screens/Settings';
import ChangeAvatar from './screens/Settings/ChangeAvatarForm';
import ChangePassword from './screens/Settings/ChangePassword';
import ChangeInformations from './screens/Settings/ChangeInformations';
import SignUp from './screens/SignUp';
import FriendDetails from './screens/FriendDetails';
import UserDetails from './screens/UserDetails';
import Requests from './screens/Requests';

const AppStack = createStackNavigator();
const ContactsStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Friends() {
  return (
    <ContactsStack.Navigator screenOptions={{ headerShown: false }}>
      <ContactsStack.Screen name="FriendList" component={FriendsList} />
      <ContactsStack.Screen name="AddFriend" component={AddFriend} />
      <ContactsStack.Screen name="SearchFriend" component={SearchFriend} />
      <ContactsStack.Screen name="FriendDetails" component={FriendDetails} />
      <ContactsStack.Screen name="UserDetails" component={UserDetails} />
    </ContactsStack.Navigator>
  );
}

function Settings() {
  return (
    <SettingsStack.Navigator initialRouteName="SettingsHome" screenOptions={{ headerShown: false}}>
      <SettingsStack.Screen name="SettingsHome" component={SettingsHome} />
      <SettingsStack.Screen name="ChangeAvatar" component={ChangeAvatar} />
      <SettingsStack.Screen name="ChangeInformations" component={ChangeInformations} />
      <SettingsStack.Screen name="ChangePassword" component={ChangePassword} /> 
    </SettingsStack.Navigator>
  );
}

function Main() {
  function iconSelector({ route }) {
    return {
        headerShown: false,
        tabBarActiveTintColor: "#12153d",
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
        let iconName;
          
        if (route.name === "Friends") {
          iconName = focused
            ? "contacts"
            : "contacts";
        } else if (route.name === "Settings") {
          iconName = focused
            ? "settings-applications"
            : "settings-applications";
        } else if (route.name === "Requests") {
          iconName = focused
            ? "group-add"
            : "group-add"
        }
    
        return <MaterialIcons name={iconName} size={size} color={color} />;
      }
    };
  }
  
  return (
    <Tab.Navigator
      screenOptions={iconSelector}
    >
      <Tab.Screen name={"Friends"} component={Friends} />
      <Tab.Screen name={"Requests"} component={Requests} />
      <Tab.Screen name={"Settings"} component={Settings} />
    </Tab.Navigator>
    );
}
  
export default function Routes() {
  const isLogged = useSelector(state => state.user.token);

  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        {
          (isLogged)
            ? <AppStack.Screen name={"Main"} component={Main}/>
            : <>
                <AppStack.Screen name={"Login"} component={Login} />
                <AppStack.Screen name={"SignUp"} component={SignUp} />
              </>
        }
      </AppStack.Navigator>
    </NavigationContainer>
  );
}