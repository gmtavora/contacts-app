import { StyleSheet } from 'react-native';

import commonStyles, { blue } from '../commonStyles';

const gray = "#9e9fa3";

export default StyleSheet.create({
  selectorContainer: {
    flex: 0.6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    borderColor: blue,
    borderWidth: 2,
    borderRadius: 5
  },
  touchable: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  touchableActive: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: blue
  },
  touchableText: {
    color: blue
  },
  touchableTextActive: {
    color: "#FFF"
  },
  contactsContainer: {
    flex: 6,
    width: "90%",
    margin: 10,
  },
  contact: {
    flexDirection: "row",
    margin: 10
  },
  contactInfo: {
    justifyContent: "center"
  },
  thumbnail: {
    height: 64,
    width: 64,
    marginRight: 20
  },
  profilePicture: {
    aspectRatio: 1,
    borderRadius: 32
  },
  sectionHeader: {
    fontWeight: "bold",
    color: gray
  },
  contactName: {
    fontWeight: "bold",
    fontSize: 16
  },
  contactCompany: {
    color: gray
  },
  addContactButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: blue,
    shadowOpacity: 0.1,
    shadowRadius: 0.12,
    elevation: 5
  },
  addContactButtonIcon: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  centralize: {
    alignItems: "center",
    justifyContent: "center"
  },
  errorIcon: {
    color: "#B80413",
    margin: 2
  }
});