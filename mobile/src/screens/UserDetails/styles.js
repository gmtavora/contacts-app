import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { blue } from '../commonStyles';

export const iconColor = "#9e9d9d";

export default StyleSheet.create({
  scrollViewContainer: {
    flex: 1
  },
  scrollView: {
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#F0F0F0"
  },
  container: {
    flex: 1,
    margin: 15,
    marginTop: 0,
    paddingBottom: 10,
    borderRadius: 10,
    backgroundColor: "#FFF",
    elevation: 2
  },
  thumbnail: {
    flex: 5,
    marginTop: 50,
    marginBottom: 20,
    borderColor: "#FFF",
    borderWidth: 2
  },
  profilePicture: {
    aspectRatio: 1,
    width: 96,
    height: 96,
    borderRadius: 48
  },
  identityContainer: {
    flex: 1,
    alignItems: "center"
  },
  name: {
    fontSize: 26
  },
  company: {
    fontSize: 14,
    color: iconColor
  },
  infoContainer: {
    marginTop: 25
  },
  emphasizedInfo: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30
  },
  emphasizedIcon: {
    alignItems: "center",
    marginTop: 12,
    marginRight: 30
  },
  emphasizedTitle: {
    fontSize: 12,
    textTransform: "uppercase",
    marginBottom: 2,
    color: iconColor
  },
  emphasizedText: {
    fontSize: 16,
    marginTop: 2
  },
  date: {
    fontSize: 10
  },
  actionContainer: {
    flexDirection: "row",
  },
  actionButton: {
    flex: 1
  },
  addContactButton: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    height: 32,
    marginTop: 15,
    backgroundColor: blue,
    borderRadius: 5
  },
  acceptButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 32,
    marginTop: 15,
    marginLeft: 20,
    marginRight: 10,
    backgroundColor: blue,
    borderRadius: 5
  },
  declineButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 32,
    marginTop: 15,
    marginLeft: 10,
    marginRight: 20,
    backgroundColor: "#F00",
    borderRadius: 5
  },
  acceptText: {
    fontWeight: "bold",
    color: "#FFF"
  },
  declineText: {
    fontWeight: "bold",
    color: "#000"
  },
  disabledButton: {
    backgroundColor: "silver"
  }
});