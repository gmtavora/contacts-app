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
    alignItems: "center"
  },
  input: {
    height: 40,
    width: "80%",
    marginBottom: 20,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderColor: "#FFF",
    color: "#FFF"
  },
  logIn: {
    width: "80%",
    height: 35,
    marginTop: 10,
    backgroundColor: "#2A3270",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
  logInText: {
    color: "#FFF"
  },
  disabledLogin: {
    backgroundColor: "silver"
  },
  createAccountArea: {
    flex: 1,
    alignItems: "center",
    marginTop: 50
  },
  dontHaveAnAccount: {
    color: "#FFF"
  },
  signUp: {
    color: "#FFF",
    fontSize: 20
  }
});