import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold"
  },
  selectorContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    borderColor: "blue",
    borderWidth: 2,
    borderRadius: 5
  },
  touchable: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  touchableActive: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue"
  },
  contactsContainer: {
    flex: 6,
    width: "90%",
    margin: 10,
  }
});