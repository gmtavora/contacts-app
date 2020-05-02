import { StyleSheet } from 'react-native';

import { blue } from '../commonStyles';

export default StyleSheet.create({
  searchContainer: {
    flex: 0.6,
    flexDirection: "row",
    width: "90%"
  },
  input: {
    flex: 3,
    height: 40,
    borderBottomWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    padding: 10
  },
  submitButton: {
    flex: 1,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: blue,
    borderRadius: 10,
    margin: 10
  },
  resultsContainer: {
    flex: 6,
    width: "90%",
    padding: 10
  },
  grayText: {
    fontWeight: "bold",
    color: "gray" 
  },
  disabledButton: {
    backgroundColor: "silver"
  },
  contact: {
    flexDirection: "row",
    margin: 10
  },
  contactInfo: {
    flex: 3,
    justifyContent: "center"
  },
  thumbnail: {
    flex: 0.8,
    height: 64,
    width: 64,
    marginRight: 20
  },
  profilePicture: {
    aspectRatio: 1,
    borderRadius: 32
  },
  contactName: {
    fontWeight: "bold",
    fontSize: 16
  },
  contactCompany: {
    color: "#9e9fa3"
  },
  addContactButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: blue,
    borderRadius: 16,
    margin: 10
  }
});