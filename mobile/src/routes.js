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
import Settings from './screens/Settings';
import SignUp from './screens/SignUp';
import FriendDetails from './screens/FriendDetails';
import UserDetails from './screens/UserDetails';
import Requests from './screens/Requests';

const AppStack = createStackNavigator();
const ContactsStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Friends() {
  return (
    <ContactsStack.Navigator headerMode="none">
      <ContactsStack.Screen name="FriendList" component={FriendsList} />
      <ContactsStack.Screen name="AddFriend" component={AddFriend} />
      <ContactsStack.Screen name="SearchFriend" component={SearchFriend} />
      <ContactsStack.Screen name="FriendDetails" component={FriendDetails} />
      <ContactsStack.Screen name="UserDetails" component={UserDetails} />
    </ContactsStack.Navigator>
  );
}

function Main() {
  function iconSelector({ route }) {
    return {
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
      tabBarOptions={{
        activeTintColor: "#12153d",
        showLabel: false,
      }}
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
      <AppStack.Navigator headerMode="none">
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