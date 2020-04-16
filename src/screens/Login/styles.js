import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5F94E3"
  },
  titleArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight
  },
  title: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "bold"
  },
  inputArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  },
  input: {
    height: 40,
    width: "80%",
    borderBottomWidth: 1,
    borderColor: "#FFF",
    color: "#FFF",
    paddingLeft: 10
  },
  logIn: {
    width: "80%",
    height: 35,
    backgroundColor: "#2A3270",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
  logInText: {
    color: "#FFF"
  },
  createAccountArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  dontHaveAnAccount: {
    color: "#FFF"
  },
  signUp: {
    color: "#FFF",
    fontSize: 20
  }
});