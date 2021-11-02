import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export const blue = "#12153d";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight
  },
  titleContainer: {
    flex: 0.8,
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 1,
    color: blue
  },
  formContainer: {
    flex: 6.6,
    width: "90%"
  },
  scrollView: {
    flex: 1,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    padding: 10
  },
  inputLabel: {
    fontWeight: "bold",
    marginBottom: 10
  },
  submitButton: {
    width: "100%",
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: blue,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 10,
    marginBottom: 10
  },
  button: {
    flex: 1,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: blue,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10
  },
  disabledButton: {
    backgroundColor: "silver"
  },
  whiteText: {
    fontWeight: "bold",
    color: "white"
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: 32
  }
});